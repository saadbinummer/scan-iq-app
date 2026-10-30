/**
 * Nuanced Category & Serving-Size Aware Nutrition Evaluator
 * Follows WHO / FSSAI guidelines while avoiding sweeping "harmful to everyone" claims.
 * Identifies incomplete data transparently.
 */

export function evaluateNutrition(product) {
  if (!product) return null;

  const nutrition = product.nutritionalInfo || {};
  const category = (product.category || "").toLowerCase();

  // 1. Mandatory Data Completeness Check
  const mandatoryFields = ["calories", "sugar", "fat", "saturatedFat", "sodium"];
  const missingFields = mandatoryFields.filter(
    (f) => nutrition[f] === undefined || nutrition[f] === null || nutrition[f] === ""
  );

  const isDataIncomplete = missingFields.length >= 2 || product.isDataIncomplete === true;

  // Extract serving size in grams or ml
  let servingGrams = 100;
  if (nutrition.servingSize) {
    const match = String(nutrition.servingSize).match(/(\d+(?:\.\d+)?)/);
    if (match) {
      servingGrams = parseFloat(match[1]) || 100;
    }
  }
  const servingRatio = servingGrams / 100;

  if (isDataIncomplete) {
    return {
      status: "INCOMPLETE",
      score: null,
      isDataIncomplete: true,
      missingFields,
      servingGrams,
      explanation:
        "The manufacturer or public database has not provided complete mandatory nutritional values (e.g., sugar, sodium, or saturated fat). Automated health grading is suspended to avoid misleading conclusions.",
      pros: ["Ingredients list can still be checked manually below."],
      cons: ["Nutritional facts are incomplete in public database."],
      perServingValues: null
    };
  }

  const sugar100 = Number(nutrition.sugar || 0);
  const sodium100 = Number(nutrition.sodium || 0);
  const satFat100 = Number(nutrition.saturatedFat || 0);
  const fiber100 = Number(nutrition.fiber || 0);
  const protein100 = Number(nutrition.protein || 0);
  const calories100 = Number(nutrition.calories || 0);

  // Per serving calculations
  const perServing = {
    calories: Math.round(calories100 * servingRatio),
    sugar: Number((sugar100 * servingRatio).toFixed(1)),
    sodium: Math.round(sodium100 * servingRatio),
    saturatedFat: Number((satFat100 * servingRatio).toFixed(1)),
    fiber: Number((fiber100 * servingRatio).toFixed(1)),
    protein: Number((protein100 * servingRatio).toFixed(1))
  };

  const pros = [];
  const cons = [];
  let score = 100;

  // Category identification
  const isBeverage =
    category.includes("drink") ||
    category.includes("beverage") ||
    category.includes("juice") ||
    category.includes("പാനീയം");
  const isOil =
    category.includes("oil") ||
    category.includes("fat") ||
    category.includes("എണ്ണ");
  const isSnack =
    category.includes("snack") ||
    category.includes("biscuit") ||
    category.includes("cookie") ||
    category.includes("ബിസ്ക്കറ്റ്");

  if (isBeverage) {
    // Liquid thresholds: Liquids absorb rapidly
    if (sugar100 > 6) {
      score -= 30;
      cons.push(
        `High liquid sugar: ${sugar100}g/100ml (${perServing.sugar}g in a ${servingGrams}ml serving). Rapidly absorbed; monitor if managing blood sugar.`
      );
    } else if (sugar100 <= 2.5) {
      pros.push(`Low sugar beverage: Only ${sugar100}g/100ml.`);
    }

    if (calories100 > 55) {
      score -= 15;
      cons.push(`High calorie density for a liquid (${calories100} kcal/100ml).`);
    }
  } else if (isOil) {
    // Edible oils naturally consist of 100% fat. Do NOT penalize total fat.
    if (satFat100 > 25) {
      score -= 25;
      cons.push(
        `Higher saturated fatty acids (${satFat100}g/100g). Best used in moderation for balanced cardiovascular intake.`
      );
    } else {
      pros.push(`Favorable unsaturated fatty acid balance with lower saturated fats.`);
    }

    if (nutrition.transFat && Number(nutrition.transFat) > 0) {
      score -= 35;
      cons.push(`Contains trans fats (${nutrition.transFat}g), which are advised to be minimized.`);
    } else {
      pros.push(`Zero trans fats disclosed.`);
    }
  } else {
    // Solid foods (Snacks, Biscuits, Cereals, General)
    if (sugar100 > 20) {
      score -= 25;
      cons.push(
        `Elevated sugar: ${sugar100}g/100g (${perServing.sugar}g per ${servingGrams}g serving). Individuals monitoring blood glucose or calories should consume cautiously.`
      );
    } else if (sugar100 < 5) {
      pros.push(`Low sugar content (${sugar100}g/100g).`);
    }

    if (satFat100 > 6) {
      score -= 20;
      cons.push(
        `Contains ${satFat100}g saturated fat per 100g (${perServing.saturatedFat}g per serving).`
      );
    }

    if (sodium100 > 550) {
      score -= 20;
      cons.push(
        `High sodium content: ${sodium100}mg/100g (${perServing.sodium}mg per serving). Relevant for salt-sensitive or hypertensive individuals.`
      );
    } else if (sodium100 < 120) {
      pros.push(`Low sodium level (<120mg/100g), gentle on blood pressure.`);
    }

    if (fiber100 >= 5) {
      score += 15;
      pros.push(`Rich in dietary fiber (${fiber100}g/100g, ${perServing.fiber}g/serving), supporting digestive health.`);
    } else if (fiber100 >= 3) {
      pros.push(`Good source of fiber (${fiber100}g/100g).`);
    }

    if (protein100 >= 8) {
      score += 10;
      pros.push(`High protein: ${protein100}g/100g (${perServing.protein}g/serving), aids muscle recovery.`);
    }
  }

  // Ingredient additives & palm oil check
  if (product.ingredients && Array.isArray(product.ingredients)) {
    const hasPalmOil = product.ingredients.some(
      (i) => i.toLowerCase().includes("palm") || i.toLowerCase().includes("പാമോയിൽ")
    );
    if (hasPalmOil) {
      cons.push("Contains Palm Oil/Palmolein as an edible vegetable fat.");
    }
  }

  let status = "HEALTHY";
  if (score < 50) {
    status = "CAUTION";
  } else if (score < 75) {
    status = "MODERATE";
  }

  return {
    status,
    score: Math.min(100, Math.max(10, score)),
    isDataIncomplete: false,
    servingGrams,
    perServing,
    pros: pros.length > 0 ? pros : ["Nutritional components fall within typical daily standards."],
    cons: cons.length > 0 ? cons : ["No major dietary cautionary flags identified in disclosed data."]
  };
}
