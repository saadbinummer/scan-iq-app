import { electronicsProducts } from "./electronicsProducts";

export const sampleFoodProducts = [
  {
    id: "prod_001",
    barcode: "8901030382345",
    name: "Britannia NutriChoice Oats Cookies",
    nameMl: "ബ്രിട്ടാനിയ ന്യൂട്രിചോയ്സ് ഓട്സ് കുക്കീസ്",
    brand: "Britannia",
    productType: "food",
    category: "Snacks & Biscuits",
    categoryMl: "ബിസ്ക്കറ്റുകൾ & സ്നാക്സ്",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 150, unit: "g" },
    price: 45,
    mrp: 50,
    nutritionalInfo: {
      servingSize: "25g",
      calories: 475,
      sugar: 14.0,
      fat: 19.5,
      saturatedFat: 8.5,
      sodium: 310,
      fiber: 6.2,
      protein: 8.5
    },
    ingredients: ["Oats Flour (38%)", "Whole Wheat Flour", "Refined Palm Oil", "Sugar", "Oat Flakes", "Baking Soda (INS 500ii)"],
    allergens: ["Gluten (Wheat, Oats)"],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 42, delivery: 15, discount: 0, finalPayable: 57, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 44, delivery: 0, discount: 5, coupon: "FRESH5", finalPayable: 39, dataType: "LIVE_API_FEED", url: "https://amazon.in" },
      { store: "Flipkart Grocery", platform: "Flipkart", price: 45, delivery: 25, discount: 10, coupon: "FLIP10", finalPayable: 60, dataType: "LIVE_API_FEED", url: "https://flipkart.com" }
    ],
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false
  },
  {
    id: "prod_002",
    barcode: "8901030382999",
    name: "Britannia Good Day Butter Cookies",
    nameMl: "ബ്രിട്ടാനിയ ഗുഡ് ഡേ ബട്ടർ കുക്കീസ്",
    brand: "Britannia",
    productType: "food",
    category: "Snacks & Biscuits",
    categoryMl: "ബിസ്ക്കറ്റുകൾ & സ്നാക്സ്",
    imageUrl: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 200, unit: "g" },
    price: 40,
    mrp: 45,
    nutritionalInfo: {
      servingSize: "20g",
      calories: 510,
      sugar: 23.5,
      fat: 24.0,
      saturatedFat: 12.0,
      sodium: 380,
      fiber: 1.2,
      protein: 5.5
    },
    ingredients: ["Refined Wheat Flour (Maida)", "Sugar", "Refined Palm Oil", "Butter (2%)", "Invert Sugar Syrup", "Emulsifiers"],
    allergens: ["Gluten (Wheat)", "Milk"],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 38, delivery: 15, discount: 0, finalPayable: 53, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 39, delivery: 20, discount: 0, finalPayable: 59, dataType: "LIVE_API_FEED", url: "https://amazon.in" },
      { store: "BigBasket", platform: "BigBasket", price: 37, delivery: 0, discount: 2, coupon: "BB2", finalPayable: 35, dataType: "CATALOG_BENCHMARK_MRP", url: "https://bigbasket.com" }
    ],
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false
  },
  {
    id: "prod_003",
    barcode: "8901499008544",
    name: "Quaker Rolled Oats 100% Wholegrain",
    nameMl: "ക്വേക്കർ റോൾഡ് ഓട്സ് 100% ഹോൾഗ്രെയിൻ",
    brand: "Quaker",
    productType: "food",
    category: "Breakfast & Cereals",
    categoryMl: "ഓട്സ് & ധാന്യങ്ങൾ",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 1000, unit: "g" },
    price: 199,
    mrp: 220,
    nutritionalInfo: {
      servingSize: "40g",
      calories: 395,
      sugar: 0.8,
      fat: 7.5,
      saturatedFat: 1.6,
      sodium: 9,
      fiber: 10.5,
      protein: 12.8
    },
    ingredients: ["100% Whole Grain Rolled Oats"],
    allergens: ["Oats (May contain traces of gluten)"],
    deals: [
      { store: "Amazon Fresh", platform: "Amazon", price: 189, delivery: 0, discount: 15, coupon: "OATS15", finalPayable: 174, dataType: "LIVE_API_FEED", url: "https://amazon.in" },
      { store: "Flipkart Grocery", platform: "Flipkart", price: 195, delivery: 20, discount: 10, coupon: "GROCERY10", finalPayable: 205, dataType: "LIVE_API_FEED", url: "https://flipkart.com" },
      { store: "BigBasket", platform: "BigBasket", price: 190, delivery: 15, discount: 5, finalPayable: 200, dataType: "CATALOG_BENCHMARK_MRP", url: "https://bigbasket.com" }
    ],
    dataSource: "USDA FoodData & OpenFoodFacts",
    isDataIncomplete: false
  },
  {
    id: "prod_004",
    barcode: "8901499011122",
    name: "Kellogg's Chocos Crunchy Cereal",
    nameMl: "കെല്ലോഗ്സ് ചോക്കോസ് ക്രിസ്പി ധാന്യം",
    brand: "Kellogg's",
    productType: "food",
    category: "Breakfast & Cereals",
    categoryMl: "ഓട്സ് & ധാന്യങ്ങൾ",
    imageUrl: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 375, unit: "g" },
    price: 185,
    mrp: 195,
    nutritionalInfo: {
      servingSize: "30g",
      calories: 390,
      sugar: 28.5,
      fat: 3.2,
      saturatedFat: 1.4,
      sodium: 360,
      fiber: 4.5,
      protein: 7.0
    },
    ingredients: ["Wheat Flour (54%)", "Sugar", "Cocoa Solids (5.5%)", "Edible Vegetable Oil", "Vitamins & Minerals"],
    allergens: ["Gluten (Wheat)"],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 180, delivery: 15, discount: 0, finalPayable: 195, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 175, delivery: 0, discount: 10, coupon: "CHOCO10", finalPayable: 165, dataType: "LIVE_API_FEED", url: "https://amazon.in" },
      { store: "Flipkart Grocery", platform: "Flipkart", price: 182, delivery: 20, discount: 0, finalPayable: 202, dataType: "LIVE_API_FEED", url: "https://flipkart.com" }
    ],
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false
  },
  {
    id: "prod_005",
    barcode: "8901063141209",
    name: "Raw Pressery Cold Pressed Valencia Orange",
    nameMl: "റോ പ്രസ്സറി കോൾഡ് പ്രസ്സ്ഡ് ഓറഞ്ച് ജ്യൂസ്",
    brand: "RAW Pressery",
    productType: "food",
    category: "Beverages & Drinks",
    categoryMl: "പാനീയങ്ങൾ",
    imageUrl: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 250, unit: "ml" },
    price: 80,
    mrp: 90,
    nutritionalInfo: {
      servingSize: "250ml",
      calories: 45,
      sugar: 9.2,
      fat: 0.1,
      saturatedFat: 0.0,
      sodium: 12,
      fiber: 1.5,
      protein: 0.7
    },
    ingredients: ["100% Valencia Orange Juice", "Vitamin C"],
    allergens: [],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 79, delivery: 15, discount: 0, finalPayable: 94, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "BigBasket", platform: "BigBasket", price: 75, delivery: 0, discount: 5, coupon: "RAW5", finalPayable: 70, dataType: "CATALOG_BENCHMARK_MRP", url: "https://bigbasket.com" }
    ],
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false
  },
  {
    id: "prod_006",
    barcode: "8901725181155",
    name: "Slice Thickest Mango Drink",
    nameMl: "സ്ലൈസ് മാംഗോ ഡ്രിങ്ക്",
    brand: "Slice",
    productType: "food",
    category: "Beverages & Drinks",
    categoryMl: "പാനീയങ്ങൾ",
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 600, unit: "ml" },
    price: 40,
    mrp: 40,
    nutritionalInfo: {
      servingSize: "200ml",
      calories: 62,
      sugar: 15.0,
      fat: 0.0,
      saturatedFat: 0.0,
      sodium: 35,
      fiber: 0.2,
      protein: 0.1
    },
    ingredients: ["Water", "Sugar", "Mango Pulp (16%)", "Acidity Regulator (330)", "Preservative (202)"],
    allergens: [],
    deals: [
      { store: "Zepto", platform: "Zepto", price: 38, delivery: 15, discount: 0, finalPayable: 53, dataType: "LIVE_API_FEED", url: "https://zepto.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 39, delivery: 0, discount: 0, finalPayable: 39, dataType: "LIVE_API_FEED", url: "https://amazon.in" }
    ],
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false
  },
  {
    id: "prod_007",
    barcode: "8906014412211",
    name: "Local Baker's Honey Almond Slice (Sample)",
    nameMl: "ലോക്കൽ ഹണി ആൽമണ്ട് കേക്ക് (സാമ്പിൾ)",
    brand: "Artisan Bakery",
    productType: "food",
    category: "Snacks & Biscuits",
    categoryMl: "ബിസ്ക്കറ്റുകൾ & സ്നാക്സ്",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 120, unit: "g" },
    price: 60,
    mrp: 65,
    nutritionalInfo: {
      servingSize: "30g",
      calories: 220,
      sugar: null,
      fat: 8.0,
      saturatedFat: null,
      sodium: null,
      fiber: null,
      protein: 3.5
    },
    ingredients: ["Flour", "Honey", "Almonds", "Vegetable Fat"],
    allergens: ["Tree Nuts (Almonds)", "Gluten"],
    deals: [
      { store: "Local Bakery Feed", platform: "In-Store", price: 60, delivery: 0, discount: 0, finalPayable: 60, dataType: "IN_STORE_INPUT", url: "#" }
    ],
    dataSource: "Partial Label / User Upload",
    isDataIncomplete: true
  }
];

export { electronicsProducts };

// Full universal catalog: Food + Electronics + Appliances + More
export const sampleProducts = [...sampleFoodProducts, ...electronicsProducts];
