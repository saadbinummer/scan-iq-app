/**
 * Curated Electronics & Gadgets Catalog for ScanIQ Universal Comparison
 * Includes Smartphones, Laptops, and Audio with live vs benchmark deals
 */

export const electronicsProducts = [
  {
    id: "elec_001",
    barcode: "195949012345",
    name: "Apple iPhone 15 (128 GB) - Black",
    nameMl: "ആപ്പിൾ ഐഫോൺ 15 (128 GB) - കറുപ്പ്",
    brand: "Apple",
    productType: "electronics",
    category: "Smartphones",
    categoryMl: "സ്മാർട്ട്‌ഫോണുകൾ",
    subcategory: "Mobile Phones",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
    packageSize: { value: 1, unit: "unit" },
    price: 69999,
    mrp: 79900,
    ratings: { average: 4.6, count: 18450 },
    warranty: "1 Year Official Apple Warranty",
    specs: {
      Display: "6.1-inch Super Retina XDR OLED, 2000 nits peak",
      Processor: "A16 Bionic chip (6-core CPU, 5-core GPU)",
      Camera: "48MP Main + 12MP Ultra Wide with 2x Telephoto",
      Storage: "128 GB NVMe",
      Battery: "Up to 20 hours video playback, USB-C Fast Charging",
      OS: "iOS 17 (Upgradeable)"
    },
    deals: [
      {
        platform: "Amazon",
        store: "Amazon India",
        price: 69999,
        delivery: 0,
        discount: 3000,
        coupon: "APL3000",
        finalPayable: 66999,
        dataType: "LIVE_API_FEED",
        url: "https://amazon.in"
      },
      {
        platform: "Flipkart",
        store: "Flipkart Electronics",
        price: 70999,
        delivery: 69,
        discount: 4000,
        coupon: "AXISBANK",
        finalPayable: 67068,
        dataType: "LIVE_API_FEED",
        url: "https://flipkart.com"
      },
      {
        platform: "Croma",
        store: "Croma Retail",
        price: 72990,
        delivery: 0,
        discount: 2500,
        coupon: "CRMA25",
        finalPayable: 70490,
        dataType: "CATALOG_BENCHMARK_MRP",
        url: "https://croma.com"
      }
    ],
    dataSource: "Authorized Retailer Catalog",
    isDataIncomplete: false
  },
  {
    id: "elec_002",
    barcode: "8806091876543",
    name: "Samsung Galaxy S24 5G (8GB RAM, 256GB Storage)",
    nameMl: "സാംസങ് ഗാലക്സി S24 5G (8GB RAM, 256GB സ്റ്റോറേജ്)",
    brand: "Samsung",
    productType: "electronics",
    category: "Smartphones",
    categoryMl: "സ്മാർട്ട്‌ഫോണുകൾ",
    subcategory: "Mobile Phones",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80",
    packageSize: { value: 1, unit: "unit" },
    price: 74999,
    mrp: 84999,
    ratings: { average: 4.5, count: 9120 },
    warranty: "1 Year Manufacturer Warranty for Device, 6 Months for In-box Accessories",
    specs: {
      Display: "6.2-inch Dynamic AMOLED 2X, 120Hz LTPO, 2600 nits",
      Processor: "Exynos 2400 / Snapdragon 8 Gen 3 for Galaxy",
      Camera: "50MP Triple OIS Camera with Galaxy AI Photo Assist",
      Storage: "256 GB UFS 4.0 (8 GB LPDDR5X RAM)",
      Battery: "4,000 mAh with 25W fast charging & wireless charging",
      AI_Features: "Circle to Search, Live Call Translate, Note Assist"
    },
    deals: [
      {
        platform: "Flipkart",
        store: "Flipkart Mobiles",
        price: 74999,
        delivery: 0,
        discount: 5000,
        coupon: "SAMS5K",
        finalPayable: 69999,
        dataType: "LIVE_API_FEED",
        url: "https://flipkart.com"
      },
      {
        platform: "Amazon",
        store: "Amazon Prime",
        price: 75499,
        delivery: 0,
        discount: 4500,
        coupon: "HDFC45",
        finalPayable: 70999,
        dataType: "LIVE_API_FEED",
        url: "https://amazon.in"
      },
      {
        platform: "Samsung Shop",
        store: "Samsung Direct",
        price: 79999,
        delivery: 0,
        discount: 8000,
        coupon: "SAMS_UPGRADE",
        finalPayable: 71999,
        dataType: "CATALOG_BENCHMARK_MRP",
        url: "https://samsung.com/in"
      }
    ],
    dataSource: "Authorized Retailer Catalog",
    isDataIncomplete: false
  },
  {
    id: "elec_003",
    barcode: "194253789012",
    name: "Apple MacBook Air 13-inch M2 (8GB RAM, 256GB SSD)",
    nameMl: "ആപ്പിൾ മാക്ബുക്ക് എയർ 13 M2 (8GB RAM, 256GB SSD)",
    brand: "Apple",
    productType: "electronics",
    category: "Laptops",
    categoryMl: "ലാപ്‌ടോപ്പുകൾ",
    subcategory: "Computers & Laptops",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    packageSize: { value: 1, unit: "unit" },
    price: 89900,
    mrp: 99900,
    ratings: { average: 4.8, count: 12500 },
    warranty: "1 Year Apple Limited Warranty",
    specs: {
      Display: "13.6-inch Liquid Retina Display with True Tone (500 nits)",
      Processor: "Apple M2 chip with 8-core CPU and 8-core GPU",
      Memory: "8 GB Unified High-Performance Memory",
      Storage: "256 GB Superfast SSD",
      Battery: "Up to 18 hours battery life, MagSafe 3 charging port",
      Weight: "1.24 kg lightweight aluminum enclosure"
    },
    deals: [
      {
        platform: "Amazon",
        store: "Amazon India Tech",
        price: 89900,
        delivery: 0,
        discount: 5000,
        coupon: "MAC5000",
        finalPayable: 84900,
        dataType: "LIVE_API_FEED",
        url: "https://amazon.in"
      },
      {
        platform: "Flipkart",
        store: "Flipkart Laptops",
        price: 91990,
        delivery: 99,
        discount: 6000,
        coupon: "SBI_CARDS",
        finalPayable: 86089,
        dataType: "LIVE_API_FEED",
        url: "https://flipkart.com"
      },
      {
        platform: "Reliance Digital",
        store: "Reliance Digital Store",
        price: 94900,
        delivery: 0,
        discount: 4000,
        coupon: "REL4K",
        finalPayable: 90900,
        dataType: "CATALOG_BENCHMARK_MRP",
        url: "https://reliancedigital.in"
      }
    ],
    dataSource: "Authorized Retailer Catalog",
    isDataIncomplete: false
  },
  {
    id: "elec_004",
    barcode: "027242921542",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    nameMl: "സോണി WH-1000XM5 വയർലെസ് നോയിസ് ക്യാൻസലിംഗ് ഹെഡ്ഫോൺ",
    brand: "Sony",
    productType: "electronics",
    category: "Audio",
    categoryMl: "ഓഡിയോ & ഹെഡ്ഫോൺ",
    subcategory: "Headphones",
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
    packageSize: { value: 1, unit: "unit" },
    price: 26990,
    mrp: 34990,
    ratings: { average: 4.7, count: 8740 },
    warranty: "1 Year Official Sony India Warranty",
    specs: {
      Noise_Cancellation: "Dual Processor V1 & QN1 with 8 microphones",
      Battery_Life: "30 hours with ANC on (3 min quick charge = 3 hours playback)",
      Sound: "30mm precision-engineered drivers with LDAC Hi-Res Audio",
      Features: "Multipoint connection, Speak-to-chat, Wearing detection"
    },
    deals: [
      {
        platform: "Amazon",
        store: "Amazon Audio Hub",
        price: 26990,
        delivery: 0,
        discount: 2000,
        coupon: "SONY2K",
        finalPayable: 24990,
        dataType: "LIVE_API_FEED",
        url: "https://amazon.in"
      },
      {
        platform: "Flipkart",
        store: "Flipkart Electronics",
        price: 27490,
        delivery: 49,
        discount: 1500,
        coupon: "FLIPHEAD",
        finalPayable: 26039,
        dataType: "LIVE_API_FEED",
        url: "https://flipkart.com"
      }
    ],
    dataSource: "Authorized Retailer Catalog",
    isDataIncomplete: false
  }
];
