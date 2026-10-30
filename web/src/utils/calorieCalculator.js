/**
 * Calorie IQ & Energy Expenditure Engine for ScanIQ
 * Calculates exact calories for custom portion sizes, daily value percentages,
 * exercise burn-off equivalents, and handles non-food tech items intelligently.
 */

import { isFoodProduct } from "./unitPriceCalculator.js";

export function calculatePortionCalories(caloriesPer100g, grams) {
  if (caloriesPer100g === null || caloriesPer100g === undefined) return null;
  const numGrams = Number(grams) || 0;
  if (numGrams <= 0) return 0;
  const calculated = (Number(caloriesPer100g) / 100) * numGrams;
  return Math.round(calculated * 10) / 10;
}

export function calculateDailyPercentage(totalKcal, standardDiet = 2000) {
  if (!totalKcal || totalKcal <= 0) return 0;
  const pct = (Number(totalKcal) / standardDiet) * 100;
  return Math.round(pct * 10) / 10;
}

export function calculateBurnOffActivities(totalKcal) {
  const kcal = Number(totalKcal) || 0;
  if (kcal <= 0) {
    return {
      walkingMins: 0,
      runningMins: 0,
      cyclingMins: 0,
      swimmingMins: 0
    };
  }

  // Activity metabolic burn rates (average for 68-70kg adult)
  // Walking (4.5 km/h): ~4.2 kcal/min
  // Running (8.5 km/h): ~9.5 kcal/min
  // Cycling (15 km/h): ~7.0 kcal/min
  // Swimming (moderate): ~8.0 kcal/min
  return {
    walkingMins: Math.max(1, Math.round(kcal / 4.2)),
    runningMins: Math.max(1, Math.round(kcal / 9.5)),
    cyclingMins: Math.max(1, Math.round(kcal / 7.0)),
    swimmingMins: Math.max(1, Math.round(kcal / 8.0))
  };
}

export function getCalorieDensity(caloriesPer100g) {
  if (caloriesPer100g === null || caloriesPer100g === undefined) {
    return { level: "UNKNOWN", label: "Unknown", color: "slate" };
  }
  const val = Number(caloriesPer100g);
  if (val < 150) {
    return {
      level: "LOW",
      label: "Low Energy Density (Light & Refreshing)",
      labelMl: "കുറഞ്ഞ കലോറി (ഭാരം കുറയ്ക്കാൻ ഉത്തമം)",
      color: "emerald"
    };
  }
  if (val <= 350) {
    return {
      level: "MODERATE",
      label: "Moderate Energy Density (Balanced Snack/Meal)",
      labelMl: "മിതമായ കലോറി (ദൈനംദിന സമീകൃതാഹാരം)",
      color: "amber"
    };
  }
  return {
    level: "HIGH",
    label: "High Energy Density (Calorie Rich / Consume Mindfully)",
    labelMl: "ഉയർന്ന കലോറി (ശ്രദ്ധയോടെ കഴിക്കുക)",
    color: "rose"
  };
}

export function calculateMacroEnergy(proteinG = 0, sugarG = 0, fatG = 0, portionGrams = 100) {
  const factor = portionGrams / 100;
  const pKcal = Math.round((Number(proteinG || 0) * factor * 4) * 10) / 10;
  const cKcal = Math.round((Number(sugarG || 0) * factor * 4) * 10) / 10;
  const fKcal = Math.round((Number(fatG || 0) * factor * 9) * 10) / 10;
  const totalMacroKcal = pKcal + cKcal + fKcal;

  return {
    proteinKcal: pKcal,
    carbsKcal: cKcal,
    fatKcal: fKcal,
    totalMacroKcal: Math.round(totalMacroKcal * 10) / 10
  };
}

export function evaluateProductCalories(product, customPortionGrams = null) {
  if (!product) return null;

  const isFood = isFoodProduct(product);
  if (!isFood) {
    return {
      isFood: false,
      productName: product.name,
      productNameMl: product.nameMl,
      totalKcal: 0,
      dailyPercentage: 0,
      caloriesPer100g: 0,
      portionGrams: 0,
      burnOff: { walkingMins: 0, runningMins: 0, cyclingMins: 0, swimmingMins: 0 },
      density: { level: "NON_EDIBLE", label: "Non-Edible Technology Hardware", labelMl: "ഡയറ്ററി കലോറിയില്ല (ഇലക്ട്രോണിക്സ്)", color: "sky" },
      techMessage: "Electronics consume electrical energy (Watts/mAh), not dietary calories!",
      techMessageMl: "ഇലക്ട്രോണിക്സ് ഉപകരണങ്ങൾ വൈദ്യുതിയാണ് ഉപയോഗിക്കുന്നത്, ഭക്ഷണ കലോറിയല്ല!",
      techEnergy: product.specs?.Battery || "Electrical Device"
    };
  }

  // Base calories per 100g/ml
  const baseKcal = product.nutritionalInfo?.calories ?? null;
  const defaultServing = parseFloat(product.nutritionalInfo?.servingSize) || product.packageSize?.value || 100;
  const portion = customPortionGrams !== null ? Number(customPortionGrams) : defaultServing;

  const totalPortionKcal = baseKcal !== null ? calculatePortionCalories(baseKcal, portion) : null;
  const dailyPct = totalPortionKcal !== null ? calculateDailyPercentage(totalPortionKcal) : 0;
  const burnOff = totalPortionKcal !== null ? calculateBurnOffActivities(totalPortionKcal) : calculateBurnOffActivities(0);
  const density = getCalorieDensity(baseKcal);
  const macros = calculateMacroEnergy(
    product.nutritionalInfo?.protein,
    product.nutritionalInfo?.sugar,
    product.nutritionalInfo?.fat,
    portion
  );

  return {
    isFood: true,
    productName: product.name,
    productNameMl: product.nameMl,
    caloriesPer100g: baseKcal,
    portionGrams: portion,
    totalKcal: totalPortionKcal,
    dailyPercentage: dailyPct,
    burnOff,
    density,
    macros,
    servingUnit: product.packageSize?.unit === "ml" ? "ml" : "g"
  };
}
