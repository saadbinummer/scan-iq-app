import { electronicsProducts } from "./electronicsProducts";

// Helper to generate realistic 8-platform grocery pricing matrix
function generate8PlatformDeals(basePrice, mrp) {
  const p = Math.round(basePrice);
  const m = Math.round(mrp || basePrice * 1.15);

  return [
    {
      store: "Blinkit",
      platform: "Blinkit",
      price: Math.max(5, p - 2),
      delivery: 15,
      discount: 0,
      coupon: null,
      finalPayable: Math.max(5, p - 2) + 15,
      eta: "10 mins",
      dataType: "LIVE_API_FEED",
      url: "https://blinkit.com"
    },
    {
      store: "Zepto",
      platform: "Zepto",
      price: Math.max(5, p - 3),
      delivery: 15,
      discount: 0,
      coupon: null,
      finalPayable: Math.max(5, p - 3) + 15,
      eta: "8 mins",
      dataType: "LIVE_API_FEED",
      url: "https://zepto.com"
    },
    {
      store: "Instamart (Swiggy)",
      platform: "Instamart",
      price: p,
      delivery: 16,
      discount: 5,
      coupon: "SWIGGY5",
      finalPayable: p + 16 - 5,
      eta: "12 mins",
      dataType: "LIVE_API_FEED",
      url: "https://swiggy.com/instamart"
    },
    {
      store: "Amazon Fresh",
      platform: "Amazon",
      price: Math.max(5, p - 4),
      delivery: 0,
      discount: 5,
      coupon: "FRESH5",
      finalPayable: Math.max(5, p - 9),
      eta: "Today 2-Hour Slot",
      dataType: "LIVE_API_FEED",
      url: "https://amazon.in"
    },
    {
      store: "Flipkart Grocery",
      platform: "Flipkart",
      price: Math.max(5, p - 1),
      delivery: 25,
      discount: 10,
      coupon: "FLIP10",
      finalPayable: Math.max(5, p + 14),
      eta: "Next Day Delivery",
      dataType: "LIVE_API_FEED",
      url: "https://flipkart.com"
    },
    {
      store: "BigBasket (bbnow)",
      platform: "BigBasket",
      price: Math.max(5, p - 5),
      delivery: 0,
      discount: 0,
      coupon: "BBNOW",
      finalPayable: Math.max(5, p - 5),
      eta: "15 mins",
      dataType: "LIVE_API_FEED",
      url: "https://bigbasket.com"
    },
    {
      store: "JioMart",
      platform: "JioMart",
      price: Math.max(5, p - 6),
      delivery: 0,
      discount: 0,
      coupon: null,
      finalPayable: Math.max(5, p - 6),
      eta: "Same Day Evening",
      dataType: "CATALOG_BENCHMARK_MRP",
      url: "https://jiomart.com"
    },
    {
      store: "Local Supermarket (In-Store)",
      platform: "In-Store",
      price: m,
      delivery: 0,
      discount: 0,
      coupon: null,
      finalPayable: m,
      eta: "Walk-in Counter",
      dataType: "IN_STORE_INPUT",
      url: "#"
    }
  ];
}

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
    deals: generate8PlatformDeals(45, 50),
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901499008544",
      name: "Quaker Rolled Oats 100% Wholegrain",
      reason: "10x higher natural fiber (10.5g) with almost zero added sugars or industrial palm fats."
    },
    economyAlternative: {
      barcode: "8901719101038",
      name: "Parle-G Original Gluco Biscuits",
      price: 10,
      reason: "Provides instant carbohydrate energy at only ₹10 per 130g pack (saves ₹35)."
    },
    recipes: [
      {
        title: "NutriChoice Yogurt Crumble Bowl",
        titleMl: "ന്യൂട്രിചോയ്സ് യോഗർട്ട് ക്രംബിൾ ബൗൾ",
        time: "3 mins",
        difficulty: "Easy",
        description: "Crush 2 cookies over 100g cold Greek yogurt and top with fresh pomegranate seeds for a crunchy healthy dessert."
      },
      {
        title: "Morning Fiber Milkshake",
        titleMl: "മോർണിംഗ് ഫൈബർ മിൽക്ക് ഷേക്ക്",
        time: "4 mins",
        difficulty: "Instant",
        description: "Blend 2 crushed cookies with 1 ripe banana, 200ml skimmed milk, and a pinch of cinnamon for a pre-workout breakfast."
      }
    ]
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
    deals: generate8PlatformDeals(40, 45),
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901030382345",
      name: "Britannia NutriChoice Oats Cookies",
      reason: "5x more dietary fiber and 40% less refined sugar compared to butter cookies."
    },
    economyAlternative: {
      barcode: "8901719101038",
      name: "Parle-G Original Gluco Biscuits",
      price: 10,
      reason: "Budget-friendly everyday biscuit at just ₹10."
    },
    recipes: [
      {
        title: "Good Day Ice Cream Sandwich",
        titleMl: "ഗുഡ് ഡേ ഐസ്ക്രീം സാൻഡ്വിച്ച്",
        time: "2 mins",
        difficulty: "Easy",
        description: "Place a scoop of sugar-free vanilla ice cream between two Good Day cookies for a quick weekend party treat."
      }
    ]
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
    deals: generate8PlatformDeals(199, 220),
    dataSource: "USDA FoodData & OpenFoodFacts",
    isDataIncomplete: false,
    healthierAlternative: null, // Already peak healthy
    economyAlternative: {
      barcode: "8901725121341",
      name: "Aashirvaad Superior MP Sharbati Atta",
      price: 245,
      reason: "Excellent wholegrain value for family staples (5kg volume pack)."
    },
    recipes: [
      {
        title: "Kerala Style Oats Upma",
        titleMl: "കേരള സ്റ്റൈൽ ഓട്സ് ഉപ്പുമാവ്",
        time: "10 mins",
        difficulty: "Medium",
        description: "Temper mustard seeds, curry leaves, green chilies, and saute carrots & beans. Add roasted oats and boiling water for a wholesome breakfast."
      },
      {
        title: "Overnight Chia & Apple Oats",
        titleMl: "ഓവർനൈറ്റ് ചിയാ ആപ്പിൾ ഓട്സ്",
        time: "5 mins (Refrigerate overnight)",
        difficulty: "Easy",
        description: "Mix 40g oats with milk, 1 tsp chia seeds, grated apple and a drop of pure honey. Let sit overnight in fridge."
      }
    ]
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
    ingredients: ["Wheat Flour (Maida)", "Palm Oil", "Iodized Salt", "Wheat Gluten", "Mineral (Calcium Carbonate)", "Spices & Condiments"],
    allergens: ["Gluten (Wheat)", "May contain Milk, Mustard, Soy"],
    deals: generate8PlatformDeals(14, 14),
    dataSource: "Verified Packaging Label & FSSAI Registry",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901499008544",
      name: "Quaker Rolled Oats (Masala Style)",
      reason: "Cut sodium by 90% and eliminate fried palm oil by making homemade savoury oats with fresh spices."
    },
    economyAlternative: null,
    recipes: [
      {
        title: "Veggie & Egg Enriched Maggi Hack",
        titleMl: "വെജിറ്റബിൾ & മുട്ട എൻറിച്ച്ഡ് മാഗി",
        time: "7 mins",
        difficulty: "Easy",
        description: "Boil Maggi with 1/2 taste-maker packet. Add 1 boiled egg, steamed broccoli, carrots, and peas to triple the protein and reduce sodium concentration per bite."
      }
    ]
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
    deals: generate8PlatformDeals(58, 60),
    dataSource: "Amul Dairy Nutrition Standards",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901063141209",
      name: "Cold-Pressed Fresh Seed or Olive Spread",
      reason: "Provides heart-healthy monounsaturated fats instead of 51g saturated animal fats."
    },
    economyAlternative: null,
    recipes: [
      {
        title: "Herb Butter Pan Glaze",
        titleMl: "ഹെർബ് ബട്ടർ പാൻ ഗ്ലേസ്",
        time: "3 mins",
        difficulty: "Easy",
        description: "Melt 10g Amul butter with fresh crushed garlic and coriander leaves to toss lightly over steamed sweet potatoes or toasted whole wheat bread."
      }
    ]
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
    ingredients: ["Potato", "Edible Vegetable Oil (Palmolein)", "Seasoning (Spices & Condiments, Sugar, Iodized Salt)"],
    allergens: ["May contain Milk Solids"],
    deals: generate8PlatformDeals(20, 20),
    dataSource: "FSSAI Verified Product Registry",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901030382345",
      name: "NutriChoice Baked Oats / Roasted Makhana",
      reason: "Bakes instead of deep frying in palmolein, slashing saturated fat by over 70%."
    },
    economyAlternative: {
      barcode: "8901719101038",
      name: "Parle-G Original Gluco Biscuits",
      price: 10,
      reason: "High satiety tea snack at half the price."
    },
    recipes: [
      {
        title: "Crispy Masala Chaat Crunch",
        titleMl: "ക്രിസ്പി മസാല ചാറ്റ് ക്രഞ്ച്",
        time: "4 mins",
        difficulty: "Easy",
        description: "Coarsely crush 20g chips with finely chopped onions, tomatoes, cucumber, lemon juice, and chaat masala for a tangy Mumbai street snack."
      }
    ]
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
    ingredients: ["Wheat Flour (Maida 67%)", "Sugar (25%)", "Edible Vegetable Oil", "Invert Sugar Syrup", "Raising Agents", "Milk Solids", "Salt"],
    allergens: ["Gluten (Wheat)", "Milk"],
    deals: generate8PlatformDeals(10, 10),
    dataSource: "Parle Products Registry",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901030382345",
      name: "Britannia NutriChoice Oats Cookies",
      reason: "Whole wheat and oats with significantly lower glycemic impact."
    },
    economyAlternative: null,
    recipes: [
      {
        title: "Quick Parle-G Tea Cake Base",
        titleMl: "പാർലെ-ജി ടീ കേക്ക് ബേസ്",
        time: "15 mins",
        difficulty: "Easy",
        description: "Grind 10 Parle-G biscuits with milk and 1/2 tsp baking powder, pour into a microwave mug for 2 minutes for a fluffy instant mug cake."
      }
    ]
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
    deals: generate8PlatformDeals(40, 40),
    dataSource: "Mondelez India Nutrition Label",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901499008544",
      name: "Dark Chocolate Oats Bites (70% Cocoa)",
      reason: "Switch to 70%+ Dark Chocolate or cocoa oats to drop sugar from 57g to under 12g while boosting antioxidants."
    },
    economyAlternative: null,
    recipes: [
      {
        title: "Warm Chocolate Oatmeal Melt",
        titleMl: "ചോക്ലേറ്റ് ഓട്സ് മെൽറ്റ്",
        time: "3 mins",
        difficulty: "Easy",
        description: "Stir 2 cubes (10g) of Dairy Milk into freshly cooked piping hot Quaker oats for an indulgent rich flavor with built-in portion control."
      }
    ]
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
    deals: generate8PlatformDeals(245, 265),
    dataSource: "ITC Foods Verified Nutrition",
    isDataIncomplete: false,
    healthierAlternative: null,
    economyAlternative: null,
    recipes: [
      {
        title: "Nutritious Methi Paratha",
        titleMl: "മേത്തി പൊറോട്ട (ആരോഗ്യകരം)",
        time: "15 mins",
        difficulty: "Medium",
        description: "Knead whole wheat flour with fresh fenugreek (methi) leaves, ajwain, turmeric, and warm water for soft, iron-rich flatbreads."
      }
    ]
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
    ingredients: ["Carbonated Water", "Sugar", "Acidity Regulator (338)", "Caffeine (9.5mg/100ml)", "Natural Caramel Color", "Natural Flavors"],
    allergens: [],
    deals: generate8PlatformDeals(40, 40),
    dataSource: "Coca-Cola Global Nutrition Profile",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901063141209",
      name: "Raw Pressery Cold Pressed Valencia Orange",
      reason: "100% natural fruit juice rich in Vitamin C with zero added refined sugars or artificial phosphoric acid."
    },
    economyAlternative: null,
    recipes: [
      {
        title: "Sparkling Mint Lime Cooler",
        titleMl: "സ്പാർക്ക്ലിംഗ് മിന്റ് ലൈം കൂളർ",
        time: "2 mins",
        difficulty: "Instant",
        description: "Dilute 100ml cola with 150ml chilled sparkling water, fresh lime juice and mint leaves to cut sugar consumption by over 60%."
      }
    ]
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
    deals: generate8PlatformDeals(80, 90),
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false,
    healthierAlternative: null,
    economyAlternative: {
      barcode: "8901725181155",
      name: "Slice Thickest Mango Drink",
      price: 40,
      reason: "Pocket friendly fruit refreshment (50% cheaper volume)."
    },
    recipes: [
      {
        title: "Immunity Booster Orange Chia Splash",
        titleMl: "ഇമ്മ്യൂണിറ്റി ബൂസ്റ്റർ ഓറഞ്ച് ചിയാ സ്പ്ലാഷ്",
        time: "3 mins",
        difficulty: "Easy",
        description: "Stir 1 tbsp soaked chia seeds and a sprig of rosemary into 200ml chilled Valencia Orange juice for Omega-3 and Vitamin C support."
      }
    ]
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
    deals: generate8PlatformDeals(40, 40),
    dataSource: "OpenFoodFacts Verified",
    isDataIncomplete: false,
    healthierAlternative: {
      barcode: "8901063141209",
      name: "Raw Pressery Cold Pressed Valencia Orange",
      reason: "No added refined sugar, pure cold-pressed natural fruit juice."
    },
    economyAlternative: null,
    recipes: [
      {
        title: "Mango Yogurt Popsicles",
        titleMl: "മാംഗോ യോഗർട്ട് പോപ്സിക്കിൾസ്",
        time: "5 mins + freeze",
        difficulty: "Easy",
        description: "Blend 100ml Slice with 100g thick yogurt, pour into popsicle molds and freeze for 4 hours for a homemade summer popsicle."
      }
    ]
  }
];

export { electronicsProducts };

// Full universal catalog: Food + Electronics + Appliances + More
export const sampleProducts = [...sampleFoodProducts, ...electronicsProducts];
