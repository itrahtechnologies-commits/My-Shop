/**
 * MyShop Internationalization (i18n)
 * Supports English (en) and Kiswahili (sw)
 */
const MyShop_TRANSLATIONS = {
  en: {
    langBtn: "SW",
    welcomeBack: "Welcome back,",
    totalProfitLoss: "Total Profit / Loss",
    last7Days: "Last 7 Days",
    sales: "Sales",
    stock: "Stock",
    stocks: "Stocks",
    expense: "Expense",
    expenses: "Expenses",
    revenue: "Revenue",
    invested: "Invested",
    recentTransactions: "Recent Transactions",
    noTransactionsYet: "No transactions yet.",
    noTransactionsRecorded: "No transactions recorded yet.",
    recordTransaction: "Record Transaction",
    cancel: "Cancel",
    category: "Category",
    saleIncome: "Sale (Income)",
    stockCost: "Stock (Inventory Cost)",
    expenseCost: "Expense (Operating Cost)",
    productName: "Product / Item Name",
    productPlaceholder: "e.g. Nike Shoes",
    quantity: "Quantity",
    unit: "Unit",
    unitPlaceholder: "e.g. kg or piece",
    pricePerUnit: "Price per Unit (TZS)",
    totalAmountPrefix: "Total Amount: TZS",
    saveEntry: "SAVE ENTRY",
    logout: "Logout",
    confirmLogout: "Confirm Logout?",
    report: "Report",
    
    // Sales page
    salesTitle: "Sales",
    salesSubtitle: "Track store earnings & transactions",
    totalSales: "Total Sales",
    entries: "Entries",
    filterByDate: "Filter by Date",
    from: "From",
    to: "To",
    clear: "Clear",
    recentSales: "Recent Sales",
    filteredResults: "Filtered Results",
    noSalesFound: "No Sales Found",
    noSalesDesc: "No records match the selected period.",
    deleteSaleConfirm: "Delete this sale?",
    showingTotal: "Showing total",

    // Stocks page
    stockHistory: "Stock History",
    stockSubtitle: "Inventory purchases & valuation",
    addNewStock: "Add New Stock",
    totalInvested: "Total Invested",
    stockItems: "Stock Items",
    lowStockNotice: "Items low in stock",
    recordNewStock: "Record New Stock",
    deleteStockConfirm: "Delete this stock entry?",
    unitPriceLabel: "Unit Purchase Price (TZS)",
    stockAlert: "Low stock alert",
    currentStock: "Current Stock",
    inStock: "in stock",

    // Expenses page
    operatingExpenses: "Operating Expenses",
    expensesSubtitle: "Store running costs & overhead",
    recordExpense: "Record Expense",
    deleteExpenseConfirm: "Delete this expense?",
    expenseItemName: "Expense Description / Item",

    // Report page
    reportTitle: "Financial Report",
    reportSubtitle: "Executive profit & loss statement",
    filterPeriod: "Filter Period",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    allTime: "All Time",
    customDateRange: "Custom Date Range",
    summaryPreview: "Summary Preview",
    totalRevenue: "Total Revenue (In)",
    totalCost: "Total Cost (Out)",
    netProfit: "Net Profit",
    generatePdf: "Generate PDF Report",
    securedDoc: "📄 Secured Financial Document",
    noRecordsFound: "No records found for the selected period.",

    // Login page
    businessMgmt: "Professional Business Management",
    signIn: "SIGN IN",
    createAccount: "CREATE ACCOUNT",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign Up",
    alreadyHaveAccount: "Already have an account?",
    login: "Login",
    username: "Username",
    password: "Password",
    shopName: "Shop Name",
    createUsername: "Create Username",
    createPassword: "Create Password",
    emailAddress: "Email Address",
    usernameOrEmail: "Username or Email",
    continueWithGoogle: "Continue with Google",
    orDivider: "OR",
    googleLoginSuccess: "Google Sign-In successful!",
    googleLoginFailed: "Google Sign-In was cancelled or failed.",
    accountCreatedSuccess: "Account created successfully! Please login.",
    loginError: "Incorrect username or password. If you haven't registered, sign up first!",

    // About page
    aboutTitle: "About MyShop",
    theVision: "The Vision",
    visionDesc: "MyShop is a modern, lightweight Enterprise Resource Planning (ERP) solution designed specifically for small and medium-sized businesses. Our goal is to simplify financial tracking and inventory management through an intuitive, executive-style interface.",
    keyFeatures: "Key Features",
    feature1: "Real-time Analytics & Growth Tracking",
    feature2: "Smart Inventory & Stock Management",
    feature3: "Professional Financial PDF Reports",
    feature4: "PWA Support for Offline Use",
    developer: "Developer",
    builtWith: "Built with ❤️ by",
    allRightsReserved: "All rights reserved.",
    back: "Back"
  },
  sw: {
    langBtn: "EN",
    welcomeBack: "Karibu tena,",
    totalProfitLoss: "Jumla ya Faida / Hasara",
    last7Days: "Siku 7 Zilizopita",
    sales: "Mauzo",
    stock: "Mzigo",
    stocks: "Mizigo",
    expense: "Matumizi",
    expenses: "Matumizi",
    revenue: "Mapato",
    invested: "Uwekezaji",
    recentTransactions: "Miamala ya Hivi Karibuni",
    noTransactionsYet: "Hakuna miamala iliyorekodiwa bado.",
    noTransactionsRecorded: "Hakuna miamala iliyorekodiwa bado.",
    recordTransaction: "Rekodi Muamala",
    cancel: "Ghairi",
    category: "Aina ya Muamala",
    saleIncome: "Mauzo (Mapato)",
    stockCost: "Mzigo (Gharama ya Mzigo)",
    expenseCost: "Matumizi (Uendeshaji)",
    productName: "Jina la Bidhaa / Kitu",
    productPlaceholder: "k.m. Viatu vya Nike",
    quantity: "Idadi",
    unit: "Kipimo",
    unitPlaceholder: "k.m. kg au vipande",
    pricePerUnit: "Bei kwa Kipimo (TZS)",
    totalAmountPrefix: "Jumla ya Kiasi: TZS",
    saveEntry: "HIFADHI REKODI",
    logout: "Toka",
    confirmLogout: "Je, unathibitisha kutoka?",
    report: "Ripoti",

    // Sales page
    salesTitle: "Mauzo",
    salesSubtitle: "Fuatilia mapato na miamala ya duka",
    totalSales: "Jumla ya Mauzo",
    entries: "Rekodi",
    filterByDate: "Chuja kwa Tarehe",
    from: "Kuanzia",
    to: "Hadi",
    clear: "Futa Kichungi",
    recentSales: "Mauzo ya Hivi Karibuni",
    filteredResults: "Matokeo Yaliyochujwa",
    noSalesFound: "Hakuna Mauzo Yaliyopatikana",
    noSalesDesc: "Hakuna rekodi zilizopatikana kwa kipindi kilichochaguliwa.",
    deleteSaleConfirm: "Je, una uhakika unataka kufuta mauzo haya?",
    showingTotal: "Jumla inayoonekana",

    // Stocks page
    stockHistory: "Historia ya Mizigo",
    stockSubtitle: "Ununuzi na thamani ya bidhaa stoo",
    addNewStock: "Ongeza Mzigo Mpya",
    totalInvested: "Jumla ya Uwekezaji",
    stockItems: "Aina za Bidhaa",
    lowStockNotice: "Bidhaa zilizopungua stoo",
    recordNewStock: "Rekodi Mzigo Mpya",
    deleteStockConfirm: "Je, una uhakika unataka kufuta mzigo huu?",
    unitPriceLabel: "Bei ya Kununulia kwa Kipimo (TZS)",
    stockAlert: "Tahadhari ya kupungua stoo",
    currentStock: "Mzigo Uliopo",
    inStock: "zilizopo",

    // Expenses page
    operatingExpenses: "Matumizi ya Uendeshaji",
    expensesSubtitle: "Gharama za kila siku za duka",
    recordExpense: "Rekodi Matumizi",
    deleteExpenseConfirm: "Je, unathibitisha kufuta matumizi haya?",
    expenseItemName: "Maelezo ya Matumizi / Kitu",

    // Report page
    reportTitle: "Ripoti ya Fedha",
    reportSubtitle: "Kauli ya kina ya faida na hasara",
    filterPeriod: "Chagua Kipindi",
    today: "Leo",
    thisWeek: "Wiki Hii",
    thisMonth: "Mwezi Huu",
    allTime: "Muda Wote",
    customDateRange: "Tarehe Maalum",
    summaryPreview: "Muhtasari wa Ripoti",
    totalRevenue: "Jumla ya Mapato (Ndani)",
    totalCost: "Jumla ya Gharama (Nje)",
    netProfit: "Faida Halisi",
    generatePdf: "Tengeneza Ripoti ya PDF",
    securedDoc: "📄 Hati Salama ya Kifedha",
    noRecordsFound: "Hakuna rekodi zilizopatikana kwa kipindi kilichochaguliwa.",

    // Login page
    businessMgmt: "Usimamizi wa Kisasa wa Biashara",
    signIn: "INGIA",
    createAccount: "FUNGUA AKAUNTI",
    dontHaveAccount: "Huna akaunti?",
    signUp: "Jisajili",
    alreadyHaveAccount: "Tayari una akaunti?",
    login: "Ingia",
    username: "Jina la Mtumiaji",
    password: "Nenosiri",
    shopName: "Jina la Duka",
    createUsername: "Unda Jina la Mtumiaji",
    createPassword: "Unda Nenosiri",
    emailAddress: "Barua Pepe (Email)",
    usernameOrEmail: "Jina la Mtumiaji au Barua Pepe",
    continueWithGoogle: "Endelea na Google",
    orDivider: "AU",
    googleLoginSuccess: "Umeingia kwa Google kwa mafanikio!",
    googleLoginFailed: "Kuingia kwa Google kumeshindikana au kumeghairiwa.",
    accountCreatedSuccess: "Akaunti imefunguliwa kwa mafanikio! Tafadhali ingia.",
    loginError: "Jina la mtumiaji au nenosiri si sahihi. Kama bado huajisajili, jisajili kwanza!",

    // About page
    aboutTitle: "Kuhusu MyShop",
    theVision: "Maono Yetu",
    visionDesc: "MyShop ni mfumo wa kisasa na mwepesi wa usimamizi wa biashara (ERP) uliotengenezwa mahususi kwa biashara ndogo na za kati. Lengo letu ni kurahisisha ufuatiliaji wa fedha na usimamizi wa stoo kwa muundo rahisi na wa kiutendaji mkuu.",
    keyFeatures: "Sifa Kuu",
    feature1: "Takwimu za Moja kwa Moja & Ukuaji wa Biashara",
    feature2: "Usimamizi Bora wa Stoo na Bidhaa",
    feature3: "Ripoti Rasmi za Kifedha za PDF",
    feature4: "Usaidizi wa PWA kwa Matumizi Bila Mtandao",
    developer: "Msanidi Programu",
    builtWith: "Imetengenezwa kwa ❤️ na",
    allRightsReserved: "Haki zote zimehifadhiwa.",
    back: "Rudi"
  }
};

function getActiveLanguage() {
  return localStorage.getItem('myShop_lang') || 'en';
}

function setActiveLanguage(lang) {
  localStorage.setItem('myShop_lang', lang);
  applyTranslations();
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function toggleAppLanguage() {
  const current = getActiveLanguage();
  const next = current === 'en' ? 'sw' : 'en';
  setActiveLanguage(next);
}

function t(key) {
  const lang = getActiveLanguage();
  return (MyShop_TRANSLATIONS[lang] && MyShop_TRANSLATIONS[lang][key]) ||
         (MyShop_TRANSLATIONS['en'] && MyShop_TRANSLATIONS['en'][key]) ||
         key;
}

function applyTranslations() {
  const lang = getActiveLanguage();
  const strings = MyShop_TRANSLATIONS[lang] || MyShop_TRANSLATIONS.en;

  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (strings[key]) {
      el.innerText = strings[key];
    }
  });

  // Update elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (strings[key]) {
      el.setAttribute('placeholder', strings[key]);
    }
  });

  // Update lang badge button if present
  const langBtn = document.getElementById('lang-text');
  if (langBtn) {
    langBtn.innerText = strings.langBtn;
  }
}

// Automatically apply when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTranslations);
} else {
  applyTranslations();
}
