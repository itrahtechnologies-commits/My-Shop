/**
 * MyShop Database Engine (IndexedDB + Cloud Storage Layer)
 * Integrates local offline-first storage with Firebase Firestore cloud database.
 */
class MyShopDatabase {
  constructor() {
    this.dbName = 'MyShopDB';
    this.version = 1;
    this.db = null;
    this.readyPromise = this.init();
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Transactions Store
        if (!db.objectStoreNames.contains('transactions')) {
          const transStore = db.createObjectStore('transactions', { keyPath: 'id' });
          transStore.createIndex('type', 'type', { unique: false });
          transStore.createIndex('date', 'date', { unique: false });
          transStore.createIndex('fullDate', 'fullDate', { unique: false });
        }

        // Stocks Store
        if (!db.objectStoreNames.contains('stocks')) {
          const stockStore = db.createObjectStore('stocks', { keyPath: 'id' });
          stockStore.createIndex('name', 'name', { unique: false });
        }

        // Settings Store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.syncFromLocalStorage();
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error("IndexedDB initialization error:", event.target.error);
        reject(event.target.error);
      };
    });
  }

  async syncFromLocalStorage() {
    try {
      const lsData = JSON.parse(localStorage.getItem('myShop_transactions')) || [];
      if (lsData.length > 0) {
        for (const item of lsData) {
          await this.putTransaction(item, false);
        }
      }
    } catch (e) {
      console.warn("Storage sync warning:", e);
    }
  }

  async putTransaction(item, syncToCloud = true) {
    if (!this.db) await this.readyPromise;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('transactions', 'readwrite');
      const store = tx.objectStore('transactions');
      const req = store.put(item);
      req.onsuccess = () => {
        if (syncToCloud && window.FirebaseCloud && window.FirebaseCloud.syncTransactionToCloud) {
          window.FirebaseCloud.syncTransactionToCloud(item).catch(console.error);
        }
        resolve(req.result);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async getAllTransactions() {
    if (!this.db) await this.readyPromise;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('transactions', 'readonly');
      const store = tx.objectStore('transactions');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async deleteTransaction(id) {
    if (!this.db) await this.readyPromise;
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('transactions', 'readwrite');
      const store = tx.objectStore('transactions');
      const req = store.delete(Number(id));
      req.onsuccess = () => {
        if (window.FirebaseCloud && window.FirebaseCloud.deleteTransactionFromCloud) {
          window.FirebaseCloud.deleteTransactionFromCloud(id).catch(console.error);
        }
        resolve(true);
      };
      req.onerror = () => reject(req.error);
    });
  }

  async exportDatabase() {
    const transactions = await this.getAllTransactions();
    const shopName = localStorage.getItem('myShop_name') || 'MyShop';
    return {
      appName: "MyShop",
      version: this.version,
      shopName,
      exportedAt: new Date().toISOString(),
      transactions
    };
  }
}

// Global Singleton Instance
window.MyShopDB = new MyShopDatabase();

// Listen for cloud sync events to update IndexedDB automatically
window.addEventListener('cloudDataSynced', (event) => {
  if (event.detail && Array.isArray(event.detail.items)) {
    event.detail.items.forEach(item => {
      window.MyShopDB.putTransaction(item, false).catch(console.error);
    });
  }
});
