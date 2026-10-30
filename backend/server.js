import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory Catalog of Popular Grocery & Food Items
const productsCatalog = [
  {
    id: "prod_001",
    barcode: "8901030382345",
    name: "Britannia NutriChoice Oats Cookies",
    nameMl: "ബ്രിട്ടാനിയ ന്യൂട്രിചോയ്സ് ഓട്സ് കുക്കീസ്",
    brand: "Britannia",
    category: "Snacks & Biscuits",
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
    ingredients: ["Oats Flour (38%)", "Whole Wheat Flour", "Refined Palm Oil", "Sugar"],
    allergens: ["Gluten"],
    deals: [
      { store: "Blinkit", price: 42, delivery: 15, discount: 0, url: "https://blinkit.com" },
      { store: "Amazon Fresh", price: 44, delivery: 0, discount: 5, coupon: "FRESH5", url: "https://amazon.in" },
      { store: "Flipkart Grocery", price: 45, delivery: 25, discount: 10, coupon: "FLIP10", url: "https://flipkart.com" }
    ]
  },
  {
    id: "prod_002",
    barcode: "8901030382999",
    name: "Britannia Good Day Butter Cookies",
    nameMl: "ബ്രിട്ടാനിയ ഗുഡ് ഡേ ബട്ടർ കുക്കീസ്",
    brand: "Britannia",
    category: "Snacks & Biscuits",
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
    ingredients: ["Refined Wheat Flour", "Sugar", "Refined Palm Oil", "Butter (2%)"],
    allergens: ["Gluten", "Milk"],
    deals: [
      { store: "Blinkit", price: 38, delivery: 15, discount: 0, url: "https://blinkit.com" },
      { store: "Amazon Fresh", price: 39, delivery: 20, discount: 0, url: "https://amazon.in" },
      { store: "BigBasket", price: 37, delivery: 0, discount: 2, coupon: "BB2", url: "https://bigbasket.com" }
    ]
  },
  {
    id: "prod_003",
    barcode: "8901499008544",
    name: "Quaker Rolled Oats 100% Wholegrain",
    nameMl: "ക്വേക്കർ റോൾഡ് ഓട്സ് 100% ഹോൾഗ്രെയിൻ",
    brand: "Quaker",
    category: "Breakfast & Cereals",
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
    allergens: ["Oats"],
    deals: [
      { store: "Amazon Fresh", price: 189, delivery: 0, discount: 15, coupon: "OATS15", url: "https://amazon.in" },
      { store: "Flipkart Grocery", price: 195, delivery: 20, discount: 10, coupon: "GROCERY10", url: "https://flipkart.com" }
    ]
  }
];

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "CompareAnything Backend", timestamp: new Date().toISOString() });
});

// Barcode Lookup with OpenFoodFacts Proxy
app.get("/api/product/barcode/:barcode", async (req, res) => {
  const { barcode } = req.params;
  const localMatch = productsCatalog.find(p => p.barcode === barcode);
  if (localMatch) {
    return res.json({ success: true, product: localMatch, source: "Local Cache" });
  }

  try {
    const offRes = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const offData = await offRes.json();
    if (offData.status === 1 && offData.product) {
      const p = offData.product;
      const nutriments = p.nutriments || {};

      const product = {
        id: `off_${barcode}`,
        barcode,
        name: p.product_name || `Product ${barcode}`,
        nameMl: p.product_name || `ഉൽപ്പന്നം ${barcode}`,
        brand: p.brands || "Unknown Brand",
        category: p.categories?.split(",")[0]?.trim() || "Food",
        packageSize: { value: 100, unit: "g" },
        price: 99,
        nutritionalInfo: {
          servingSize: p.serving_size || "100g",
          calories: nutriments["energy-kcal_100g"] || 0,
          sugar: nutriments["sugars_100g"] ?? null,
          fat: nutriments["fat_100g"] ?? null,
          saturatedFat: nutriments["saturated-fat_100g"] ?? null,
          sodium: nutriments["sodium_100g"] ? Math.round(nutriments["sodium_100g"] * 1000) : null,
          fiber: nutriments["fiber_100g"] ?? null,
          protein: nutriments["proteins_100g"] ?? null
        },
        ingredients: p.ingredients_text ? p.ingredients_text.split(",").slice(0, 10) : [],
        allergens: p.allergens_tags || [],
        deals: [
          { store: "Verified Retail Feed", price: 95, delivery: 0, discount: 5, url: "#" }
        ],
        dataSource: "OpenFoodFacts Global API"
      };
      return res.json({ success: true, product, source: "OpenFoodFacts API" });
    }
  } catch (err) {
    console.error("OpenFoodFacts proxy error:", err);
  }

  res.status(404).json({ success: false, message: "Product not found" });
});

// Product Search API
app.get("/api/product/search", (req, res) => {
  const query = (req.query.q || "").toLowerCase().trim();
  if (!query) {
    return res.json({ success: true, products: productsCatalog });
  }

  const results = productsCatalog.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (p.nameMl && p.nameMl.toLowerCase().includes(query)) ||
    p.brand.toLowerCase().includes(query) ||
    p.barcode.includes(query)
  );

  res.json({ success: true, products: results });
});

// Compare Endpoint (Server-Side True Value & Category Fairness Check)
app.post("/api/compare", (req, res) => {
  const { prodA, prodB } = req.body;
  if (!prodA || !prodB) {
    return res.status(400).json({ error: "Both prodA and prodB are required" });
  }

  const unitA = ((prodA.price / (prodA.packageSize?.value || 100)) * 100).toFixed(2);
  const unitB = ((prodB.price / (prodB.packageSize?.value || 100)) * 100).toFixed(2);

  const catA = (prodA.category || "").toLowerCase();
  const catB = (prodB.category || "").toLowerCase();
  const isSameCategory = catA.includes(catB) || catB.includes(catA);

  res.json({
    unitA: Number(unitA),
    unitB: Number(unitB),
    betterValue: Number(unitA) < Number(unitB) ? "A" : Number(unitB) < Number(unitA) ? "B" : "EQUAL",
    isSameCategory,
    categoryWarning: !isSameCategory ? `Comparing different categories (${prodA.category} vs ${prodB.category})` : null
  });
});

app.listen(PORT, () => {
  console.log(`CompareAnything server running on http://localhost:${PORT}`);
});
