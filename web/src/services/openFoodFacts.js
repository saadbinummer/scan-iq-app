/**
 * OpenFoodFacts Live API Integration (Global & Multi-Country)
 * Endpoint: https://world.openfoodfacts.org/api/v0/product/{barcode}.json
 */

import { sampleProducts } from "../data/sampleProducts";

export async function fetchProductByBarcode(barcode) {
  const cleanBarcode = String(barcode).trim();

  // 1. Check local curated products first for instant response
  const localMatch = sampleProducts.find(p => p.barcode === cleanBarcode);
  if (localMatch) {
    return { success: true, product: localMatch, source: "Local Verified Cache" };
  }

  // 2. Fetch from live Global OpenFoodFacts API
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${cleanBarcode}.json`);
    if (!response.ok) {
      throw new Error(`OpenFoodFacts HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    if (data.status === 1 && data.product) {
      const p = data.product;
      const nutriments = p.nutriments || {};

      // Parse quantity / package size
      let sizeValue = 100;
      let sizeUnit = "g";
      if (p.quantity) {
        const match = p.quantity.match(/(\d+(?:\.\d+)?)\s*(g|kg|ml|l|oz)/i);
        if (match) {
          const val = parseFloat(match[1]);
          const unit = match[2].toLowerCase();
          if (unit === "kg") {
            sizeValue = val * 1000;
            sizeUnit = "g";
          } else if (unit === "l") {
            sizeValue = val * 1000;
            sizeUnit = "ml";
          } else {
            sizeValue = val;
            sizeUnit = unit;
          }
        }
      }

      // Check completeness
      const hasSugar = nutriments["sugars_100g"] !== undefined;
      const hasFat = nutriments["fat_100g"] !== undefined;
      const hasSodium = nutriments["sodium_100g"] !== undefined || nutriments["salt_100g"] !== undefined;
      const isDataIncomplete = !hasSugar || !hasFat || !hasSodium;

      const mappedProduct = {
        id: `off_${cleanBarcode}`,
        barcode: cleanBarcode,
        name: p.product_name || p.product_name_en || `Item ${cleanBarcode}`,
        nameMl: p.product_name || `ഉൽപ്പന്നം ${cleanBarcode}`,
        brand: p.brands || "Brand Not Specified",
        category: p.categories?.split(",")[0]?.trim() || "Grocery & Food",
        categoryMl: p.categories?.split(",")[0]?.trim() || "ഭക്ഷണസാധനങ്ങൾ",
        imageUrl: p.image_front_url || p.image_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60",
        packageSize: {
          value: sizeValue,
          unit: sizeUnit
        },
        price: 99, // default estimated price when live store feed not connected
        mrp: 110,
        nutritionalInfo: {
          servingSize: p.serving_size || "100g",
          calories: nutriments["energy-kcal_100g"] || Math.round((nutriments["energy_100g"] || 0) / 4.184) || null,
          sugar: nutriments["sugars_100g"] ?? null,
          fat: nutriments["fat_100g"] ?? null,
          saturatedFat: nutriments["saturated-fat_100g"] ?? null,
          sodium: nutriments["sodium_100g"] ? Math.round(nutriments["sodium_100g"] * 1000) : (nutriments["salt_100g"] ? Math.round((nutriments["salt_100g"] / 2.5) * 1000) : null),
          fiber: nutriments["fiber_100g"] ?? null,
          protein: nutriments["proteins_100g"] ?? null
        },
        ingredients: p.ingredients_text ? p.ingredients_text.split(",").map(i => i.trim()).slice(0, 10) : [],
        allergens: p.allergens_tags ? p.allergens_tags.map(a => a.replace(/^[a-z]+:/, "")) : [],
        deals: [
          { store: "Verified Retail Partner", price: 95, delivery: 0, discount: 5, url: "#" }
        ],
        dataSource: "OpenFoodFacts Global DB (CC-BY-SA)",
        isDataIncomplete
      };

      return { success: true, product: mappedProduct, source: "OpenFoodFacts Live" };
    }
  } catch (err) {
    console.warn("Live OpenFoodFacts API query failed or timed out:", err);
  }

  return { success: false, error: "Product not found in OpenFoodFacts or local database." };
}

export async function searchProducts(query) {
  const q = String(query).toLowerCase().trim();
  if (!q) return sampleProducts;

  // Local filtered search
  const localResults = sampleProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    (p.nameMl && p.nameMl.toLowerCase().includes(q)) ||
    (p.brand && p.brand.toLowerCase().includes(q)) ||
    (p.category && p.category.toLowerCase().includes(q)) ||
    p.barcode.includes(q)
  );

  return localResults;
}
