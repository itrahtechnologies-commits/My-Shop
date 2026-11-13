import './pwa';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot, 
  getDocFromServer 
} from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('[Firebase Auth] Error signing in with Google:', error);
    throw error;
  }
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export async function syncTransactionToCloud(transaction: any) {
  try {
    if (!transaction || !transaction.id) return;
    const docRef = doc(db, 'transactions', String(transaction.id));
    await setDoc(docRef, transaction, { merge: true });
  } catch (error) {
    console.error('[Firestore] Error saving transaction to cloud:', error);
  }
}

export async function deleteTransactionFromCloud(id: number | string) {
  try {
    if (!id) return;
    const docRef = doc(db, 'transactions', String(id));
    await deleteDoc(docRef);
  } catch (error) {
    console.error('[Firestore] Error deleting transaction from cloud:', error);
  }
}

export async function fetchAllTransactionsFromCloud() {
  try {
    const snap = await getDocs(collection(db, 'transactions'));
    const items: any[] = [];
    snap.forEach((d) => items.push(d.data()));
    return items;
  } catch (error) {
    console.error('[Firestore] Error fetching transactions from cloud:', error);
    return [];
  }
}

export function subscribeToCloudTransactions(callback: (items: any[]) => void) {
  try {
    return onSnapshot(collection(db, 'transactions'), (snap) => {
      const items: any[] = [];
      snap.forEach((d) => items.push(d.data()));
      callback(items);
    }, (error) => {
      console.warn('[Firestore] Realtime subscription status:', error);
    });
  } catch (e) {
    console.warn('[Firestore] Subscription setup error:', e);
  }
}

// Global registration for standalone pages
if (typeof window !== 'undefined') {
  (window as any).FirebaseCloud = {
    db,
    auth,
    googleProvider,
    loginWithGoogle,
    syncTransactionToCloud,
    deleteTransactionFromCloud,
    fetchAllTransactionsFromCloud,
    subscribeToCloudTransactions
  };

  // Run initial cloud pull and push
  setTimeout(async () => {
    try {
      const localData = JSON.parse(localStorage.getItem('myShop_transactions') || '[]');
      if (localData.length > 0) {
        // Sync any pending local items to cloud
        for (const item of localData) {
          await syncTransactionToCloud(item);
        }
      }
      // Listen for updates from other devices
      subscribeToCloudTransactions((cloudItems) => {
        if (cloudItems && cloudItems.length > 0) {
          const current = JSON.parse(localStorage.getItem('myShop_transactions') || '[]');
          const mergedMap = new Map();
          current.forEach((t: any) => mergedMap.set(t.id, t));
          cloudItems.forEach((t: any) => mergedMap.set(t.id, t));
          const merged = Array.from(mergedMap.values());
          localStorage.setItem('myShop_transactions', JSON.stringify(merged));
          window.dispatchEvent(new CustomEvent('cloudDataSynced', { detail: { items: merged } }));
        }
      });
    } catch (e) {
      console.warn('[Firestore] Initial sync notice:', e);
    }
  }, 1000);
}
