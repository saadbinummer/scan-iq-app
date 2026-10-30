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
  },
  {
    id: "prod_008",
    barcode: "8901058852448",
    name: "Maggi 2-Minute Masala Noodles",
    nameMl: "മാഗി 2-മിനിറ്റ് മസാല നൂഡിൽസ്",
    brand: "Nestle Maggi",
    productType: "food",
    category: "Instant Noodles & Pasta",
    categoryMl: "ഇൻസ്റ്റന്റ് നൂഡിൽസ് & പാസ്ത",
    imageUrl: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 70, unit: "g" },
    price: 14,
    mrp: 14,
    nutritionalInfo: {
      servingSize: "70g (1 pack)",
      calories: 427,
      sugar: 2.2,
      fat: 15.7,
      saturatedFat: 6.8,
      sodium: 1040,
      fiber: 3.5,
      protein: 8.0
    },
    ingredients: ["Wheat Flour (Maida)", "Palm Oil", "Iodized Salt", "Wheat Gluten", "Mineral (Calcium Carbonate)", "Spices & Condiments (Onion Powder, Coriander, Chili, Turmeric, Cumin, Aniseed, Ginger, Fenugreek, Black Pepper, Clove, Nutmeg, Cardamom)"],
    allergens: ["Gluten (Wheat)", "May contain Milk, Mustard, Soy"],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 14, delivery: 15, discount: 0, finalPayable: 29, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Zepto", platform: "Zepto", price: 14, delivery: 15, discount: 0, finalPayable: 29, dataType: "LIVE_API_FEED", url: "https://zepto.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 13, delivery: 0, discount: 1, coupon: "MAGGI1", finalPayable: 12, dataType: "LIVE_API_FEED", url: "https://amazon.in" }
    ],
    dataSource: "Verified Packaging Label & FSSAI Registry",
    isDataIncomplete: false
  },
  {
    id: "prod_009",
    barcode: "8901262010054",
    name: "Amul Pasteurised Salted Butter",
    nameMl: "അമുൽ പാസ്ചറൈസ്ഡ് ബട്ടർ",
    brand: "Amul",
    productType: "food",
    category: "Dairy & Butter",
    categoryMl: "പാൽ ഉൽപ്പന്നങ്ങൾ & വെണ്ണ",
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 100, unit: "g" },
    price: 58,
    mrp: 60,
    nutritionalInfo: {
      servingSize: "10g",
      calories: 722,
      sugar: 0.0,
      fat: 80.0,
      saturatedFat: 51.0,
      sodium: 830,
      fiber: 0.0,
      protein: 0.5
    },
    ingredients: ["Butter (Milk Fat 80%)", "Common Salt", "Permitted Natural Color (Annatto)"],
    allergens: ["Milk"],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 58, delivery: 15, discount: 0, finalPayable: 73, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Zepto", platform: "Zepto", price: 58, delivery: 15, discount: 0, finalPayable: 73, dataType: "LIVE_API_FEED", url: "https://zepto.com" },
      { store: "BigBasket", platform: "BigBasket", price: 56, delivery: 0, discount: 2, coupon: "AMUL2", finalPayable: 54, dataType: "CATALOG_BENCHMARK_MRP", url: "https://bigbasket.com" }
    ],
    dataSource: "Amul Dairy Nutrition Standards",
    isDataIncomplete: false
  },
  {
    id: "prod_010",
    barcode: "8901491101837",
    name: "Lay's India's Magic Masala Potato Chips",
    nameMl: "ലെയ്സ് മാജിക് മസാല ചിപ്സ്",
    brand: "Lay's",
    productType: "food",
    category: "Snacks & Chips",
    categoryMl: "സ്നാക്സ് & ചിപ്സ്",
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 50, unit: "g" },
    price: 20,
    mrp: 20,
    nutritionalInfo: {
      servingSize: "30g",
      calories: 544,
      sugar: 4.5,
      fat: 33.5,
      saturatedFat: 13.0,
      sodium: 870,
      fiber: 3.0,
      protein: 7.0
    },
    ingredients: ["Potato", "Edible Vegetable Oil (Palmolein)", "Seasoning (Spices & Condiments, Sugar, Iodized Salt, Black Salt, Mango Powder, Citric Acid)"],
    allergens: ["May contain Milk Solids"],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 20, delivery: 15, discount: 0, finalPayable: 35, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Zepto", platform: "Zepto", price: 20, delivery: 15, discount: 0, finalPayable: 35, dataType: "LIVE_API_FEED", url: "https://zepto.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 19, delivery: 0, discount: 1, coupon: "CHIPS1", finalPayable: 18, dataType: "LIVE_API_FEED", url: "https://amazon.in" }
    ],
    dataSource: "FSSAI Verified Product Registry",
    isDataIncomplete: false
  },
  {
    id: "prod_011",
    barcode: "8901719101038",
    name: "Parle-G Original Gluco Biscuits",
    nameMl: "പാർലെ-ജി ഗ്ലൂക്കോ ബിസ്ക്കറ്റ്",
    brand: "Parle",
    productType: "food",
    category: "Snacks & Biscuits",
    categoryMl: "ബിസ്ക്കറ്റുകൾ & സ്നാക്സ്",
    imageUrl: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 130, unit: "g" },
    price: 10,
    mrp: 10,
    nutritionalInfo: {
      servingSize: "25g",
      calories: 454,
      sugar: 25.5,
      fat: 13.0,
      saturatedFat: 6.2,
      sodium: 260,
      fiber: 1.5,
      protein: 6.5
    },
    ingredients: ["Wheat Flour (Maida 67%)", "Sugar (25%)", "Edible Vegetable Oil (Palm Oil)", "Invert Sugar Syrup", "Raising Agents", "Milk Solids", "Salt"],
    allergens: ["Gluten (Wheat)", "Milk"],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 10, delivery: 15, discount: 0, finalPayable: 25, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Zepto", platform: "Zepto", price: 10, delivery: 15, discount: 0, finalPayable: 25, dataType: "LIVE_API_FEED", url: "https://zepto.com" },
      { store: "BigBasket", platform: "BigBasket", price: 9, delivery: 0, discount: 1, coupon: "PARLE1", finalPayable: 8, dataType: "CATALOG_BENCHMARK_MRP", url: "https://bigbasket.com" }
    ],
    dataSource: "Parle Products Registry",
    isDataIncomplete: false
  },
  {
    id: "prod_012",
    barcode: "8901233024844",
    name: "Cadbury Dairy Milk Chocolate",
    nameMl: "കാഡ്ബറി ഡയറി മിൽക്ക് ചോക്ലേറ്റ്",
    brand: "Cadbury",
    productType: "food",
    category: "Chocolates & Confectionery",
    categoryMl: "ചോക്ലേറ്റുകൾ & മധുരപലഹാരങ്ങൾ",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 50, unit: "g" },
    price: 40,
    mrp: 40,
    nutritionalInfo: {
      servingSize: "20g",
      calories: 532,
      sugar: 57.0,
      fat: 30.0,
      saturatedFat: 18.5,
      sodium: 140,
      fiber: 2.0,
      protein: 7.5
    },
    ingredients: ["Sugar", "Milk Solids (20%)", "Cocoa Butter", "Cocoa Solids", "Emulsifiers (442, 476)", "Flavors"],
    allergens: ["Milk", "May contain Tree Nuts, Wheat"],
    deals: [
      { store: "Blinkit", platform: "Blinkit", price: 40, delivery: 15, discount: 0, finalPayable: 55, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Zepto", platform: "Zepto", price: 40, delivery: 15, discount: 0, finalPayable: 55, dataType: "LIVE_API_FEED", url: "https://zepto.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 38, delivery: 0, discount: 2, coupon: "CHOC2", finalPayable: 36, dataType: "LIVE_API_FEED", url: "https://amazon.in" }
    ],
    dataSource: "Mondelez India Nutrition Label",
    isDataIncomplete: false
  },
  {
    id: "prod_013",
    barcode: "8901725121341",
    name: "Aashirvaad Superior MP Sharbati Atta 5kg",
    nameMl: "ആശീർവാദ് സുപ്പീരിയർ എം.പി ആട്ട 5kg",
    brand: "Aashirvaad",
    productType: "food",
    category: "Flours & Grains",
    categoryMl: "ധാന്യങ്ങൾ & പൊടികൾ",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 5000, unit: "g" },
    price: 245,
    mrp: 265,
    nutritionalInfo: {
      servingSize: "40g (1 Roti)",
      calories: 365,
      sugar: 2.5,
      fat: 1.8,
      saturatedFat: 0.4,
      sodium: 5,
      fiber: 11.5,
      protein: 11.0
    },
    ingredients: ["100% Whole Wheat Sharbati Grain"],
    allergens: ["Gluten (Wheat)"],
    deals: [
      { store: "BigBasket", platform: "BigBasket", price: 240, delivery: 0, discount: 15, coupon: "ATTA15", finalPayable: 225, dataType: "CATALOG_BENCHMARK_MRP", url: "https://bigbasket.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 245, delivery: 0, discount: 10, coupon: "FRESH10", finalPayable: 235, dataType: "LIVE_API_FEED", url: "https://amazon.in" },
      { store: "Blinkit", platform: "Blinkit", price: 255, delivery: 15, discount: 0, finalPayable: 270, dataType: "LIVE_API_FEED", url: "https://blinkit.com" }
    ],
    dataSource: "ITC Foods Verified Nutrition",
    isDataIncomplete: false
  },
  {
    id: "prod_014",
    barcode: "8901764012210",
    name: "Coca-Cola Original Refreshing Taste 330ml",
    nameMl: "കൊക്കകോള ഒറിജിനൽ ടേസ്റ്റ് 330ml",
    brand: "Coca-Cola",
    productType: "food",
    category: "Beverages & Drinks",
    categoryMl: "പാനീയങ്ങൾ",
    imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60",
    packageSize: { value: 330, unit: "ml" },
    price: 40,
    mrp: 40,
    nutritionalInfo: {
      servingSize: "330ml (1 can)",
      calories: 44,
      sugar: 10.6,
      fat: 0.0,
      saturatedFat: 0.0,
      sodium: 11,
      fiber: 0.0,
      protein: 0.0
    },
    ingredients: ["Carbonated Water", "Sugar", "Acidity Regulator (338)", "Caffeine (9.5mg/100ml)", "Natural Caramel Color (150d)", "Natural Flavors"],
    allergens: [],
    deals: [
      { store: "Zepto", platform: "Zepto", price: 40, delivery: 15, discount: 0, finalPayable: 55, dataType: "LIVE_API_FEED", url: "https://zepto.com" },
      { store: "Blinkit", platform: "Blinkit", price: 40, delivery: 15, discount: 0, finalPayable: 55, dataType: "LIVE_API_FEED", url: "https://blinkit.com" },
      { store: "Amazon Fresh", platform: "Amazon", price: 38, delivery: 0, discount: 2, coupon: "COKE2", finalPayable: 36, dataType: "LIVE_API_FEED", url: "https://amazon.in" }
    ],
    dataSource: "Coca-Cola Global Nutrition Profile",
    isDataIncomplete: false
  }
];

export { electronicsProducts };

// Full universal catalog: Food + Electronics + Appliances + More
export const sampleProducts = [...sampleFoodProducts, ...electronicsProducts];
