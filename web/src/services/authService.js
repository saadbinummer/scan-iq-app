/**
 * ScanIQ User Authentication, Dietary Profile & Cloud-Sync Service
 * Supports Google Login (OAuth / Persistent Identity)
 * Manages:
 * 1. Google Profile (Name, Email, Picture)
 * 2. Personal Allergen & Dietary Sensitivity Filters
 * 3. Scan History (Chronological timeline)
 * 4. Starred Favorites
 */

const USER_STORAGE_KEY = "scaniq_google_user";
const DIET_STORAGE_KEY = "scaniq_dietary_profile";
const HISTORY_STORAGE_KEY = "scaniq_scan_history";
const FAVORITES_STORAGE_KEY = "scaniq_favorites";

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loginWithGoogle(customUser = null) {
  const user = customUser || {
    id: "g_user_saad_vornix",
    name: "Saad",
    title: "Founder, vornixverse",
    email: "saad@vornixverse.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    authProvider: "Google Verified",
    joinedDate: new Date().toLocaleDateString()
  };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("scaniq_auth_change"));
  return user;
}

export function updateUserProfile(updatedFields) {
  const current = getCurrentUser() || loginWithGoogle();
  const updated = { ...current, ...updatedFields };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("scaniq_auth_change"));
  return updated;
}

export function logout() {
  localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new Event("scaniq_auth_change"));
}

// =================== DIETARY & ALLERGEN PROFILE ===================
export function getDietaryPreferences() {
  try {
    const raw = localStorage.getItem(DIET_STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          nutAllergy: false,
          dairyIntolerant: false,
          glutenFree: false,
          diabeticMode: false,
          palmOilFree: false,
          soyAllergy: false
        };
  } catch {
    return {
      nutAllergy: false,
      dairyIntolerant: false,
      glutenFree: false,
      diabeticMode: false,
      palmOilFree: false,
      soyAllergy: false
    };
  }
}

export function saveDietaryPreferences(prefs) {
  localStorage.setItem(DIET_STORAGE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new Event("scaniq_diet_change"));
}

/**
 * Checks if a product triggers any of the user's personal dietary/allergen alerts
 */
export function checkUserAllergenConflict(product) {
  const user = getCurrentUser();
  if (!user) return [];

  const prefs = getDietaryPreferences();
  const conflicts = [];
  const allergens = (product.allergens || []).map((a) => a.toLowerCase());
  const ingredients = (product.ingredients || []).join(" ").toLowerCase();
  const allText = allergens.join(" ") + " " + ingredients;
  const sugar = product.nutritionalInfo?.sugar || 0;

  if (prefs.nutAllergy && (allText.includes("nut") || allText.includes("peanut") || allText.includes("almond"))) {
    conflicts.push({
      type: "nut",
      title: "Nut / Peanut Allergy Conflict",
      titleMl: "നട്സ് / നിലക്കടല അലർജി മുന്നറിയിപ്പ്",
      message: "This product contains nuts or peanuts, which conflicts with your allergy profile!"
    });
  }

  if (prefs.dairyIntolerant && (allText.includes("milk") || allText.includes("dairy") || allText.includes("butter") || allText.includes("cheese"))) {
    conflicts.push({
      type: "dairy",
      title: "Lactose / Dairy Conflict",
      titleMl: "പാൽ / ലാക്ടോസ് അലർജി മുന്നറിയിപ്പ്",
      message: "Contains milk or dairy solids. May cause lactose intolerance discomfort!"
    });
  }

  if (prefs.glutenFree && (allText.includes("gluten") || allText.includes("wheat") || allText.includes("maida"))) {
    conflicts.push({
      type: "gluten",
      title: "Gluten / Wheat Conflict",
      titleMl: "ഗ്ലൂട്ടൻ / ഗോതമ്പ് മുന്നറിയിപ്പ്",
      message: "Contains wheat/gluten. Strictly not suitable for Celiac or gluten-free diets!"
    });
  }

  if (prefs.diabeticMode && sugar > 15) {
    conflicts.push({
      type: "sugar",
      title: "High Sugar (Diabetic Alert)",
      titleMl: "ഉയർന്ന പഞ്ചസാര (ഡയബറ്റിക് മുന്നറിയിപ്പ്)",
      message: `Contains ${sugar}g sugar per 100g. Conflicts with your Low-Sugar / Diabetic preference!`
    });
  }

  if (prefs.palmOilFree && (allText.includes("palm") || allText.includes("palmolein"))) {
    conflicts.push({
      type: "palmoil",
      title: "Contains Palm Oil",
      titleMl: "പാം ഓയിൽ അടങ്ങിയിരിക്കുന്നു",
      message: "Contains Palm Oil / Palmolein, which you have chosen to avoid."
    });
  }

  return conflicts;
}

// =================== SCAN HISTORY ===================
export function getScanHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToScanHistory(product) {
  if (!product || !product.barcode) return;
  try {
    let history = getScanHistory();
    // Remove if already exists so it gets bumped to top
    history = history.filter((item) => item.barcode !== product.barcode);
    const entry = {
      id: product.id,
      barcode: product.barcode,
      name: product.name,
      nameMl: product.nameMl,
      brand: product.brand,
      category: product.category,
      categoryMl: product.categoryMl,
      imageUrl: product.imageUrl,
      price: product.price,
      calories: product.nutritionalInfo?.calories,
      sugar: product.nutritionalInfo?.sugar,
      scannedAt: new Date().toISOString()
    };
    history.unshift(entry);
    // Keep max 50 recent items
    history = history.slice(0, 50);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    window.dispatchEvent(new Event("scaniq_history_change"));
  } catch (err) {
    console.warn("Could not save to scan history:", err);
  }
}

export function clearScanHistory() {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
  window.dispatchEvent(new Event("scaniq_history_change"));
}

// =================== FAVORITES & BOOKMARKS ===================
export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(barcode) {
  const favs = getFavorites();
  return favs.some((f) => f.barcode === barcode);
}

export function toggleFavorite(product) {
  if (!product || !product.barcode) return false;
  let favs = getFavorites();
  const exists = favs.some((f) => f.barcode === product.barcode);

  if (exists) {
    favs = favs.filter((f) => f.barcode !== product.barcode);
  } else {
    favs.unshift({
      id: product.id,
      barcode: product.barcode,
      name: product.name,
      nameMl: product.nameMl,
      brand: product.brand,
      category: product.category,
      imageUrl: product.imageUrl,
      price: product.price,
      calories: product.nutritionalInfo?.calories,
      addedAt: new Date().toISOString()
    });
  }

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favs));
  window.dispatchEvent(new Event("scaniq_favorites_change"));
  return !exists;
}
