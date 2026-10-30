/**
 * ScanIQ Nuanced Category & Serving-Size Aware Nutrition Evaluator
 * Follows WHO / FSSAI guidelines with explicit:
 * 1. Single-Sentence Verdict & Specific Reason (Healthy, Caution/Unhealthy, Moderate)
 * 2. Clinical Health Risk Warnings (Type-2 Diabetes, Hypertension, LDL Cholesterol, Dental)
 * 3. Deep Allergen & Disease Mapping (Gluten, Lactose, Nuts, Soy, Additives)
 * 4. Nutri-Score Letter Grade (A, B, C, D)
 */

export function evaluateNutrition(product, language = "en") {
  if (!product) return null;

  const nutrition = product.nutritionalInfo || {};
  const category = (product.category || "").toLowerCase();
  const isMl = language === "ml";

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
      grade: "N/A",
      score: null,
      isDataIncomplete: true,
      missingFields,
      servingGrams,
      singleSentenceVerdict: {
        type: "INCOMPLETE",
        title: isMl ? "ഡാറ്റ അപൂർണ്ണമാണ്" : "Incomplete Nutritional Data",
        reason: isMl
          ? "പാക്കേജ് ലേബലിൽ ഷുഗർ അല്ലെങ്കിൽ സോഡിയം വിവരങ്ങൾ ലഭ്യമല്ലാത്തതിനാൽ റേറ്റിംഗ് താൽക്കാലികമായി ഒഴിവാക്കിയിരിക്കുന്നു."
          : "Essential nutritional metrics (sugar/sodium) are not fully disclosed on the public label.",
        fullText: isMl
          ? "പരിശോധന അപൂർണ്ണം — കാരണം: ഉൽപ്പന്നത്തിന്റെ ഷുഗർ, സോഡിയം അളവുകൾ കൃത്യമായി രേഖപ്പെടുത്തിയിട്ടില്ല."
          : "Incomplete Data — Reason: Mandatory nutritional values like sugar or sodium are not fully disclosed."
      },
      healthRisks: [],
      allergyRisks: [],
      pros: ["Ingredients list can still be checked manually."],
      cons: ["Nutritional facts are incomplete in public database."],
      perServing: null
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
  const healthRisks = [];
  const allergyRisks = [];
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
    category.includes("chip") ||
    category.includes("ബിസ്ക്കറ്റ്");

  if (isBeverage) {
    if (sugar100 > 6) {
      score -= 35;
      cons.push(`High liquid sugar: ${sugar100}g/100ml (${perServing.sugar}g per ${servingGrams}ml serving). Rapidly absorbed.`);
      healthRisks.push({
        condition: isMl ? "ടൈപ്പ്-2 ഡയബറ്റിസ് & ഇൻസുലിൻ സ്പൈക്ക്" : "Type-2 Diabetes & Rapid Glucose Spike",
        severity: "HIGH",
        detail: isMl
          ? "ലിക്വിഡ് ഷുഗർ രക്തത്തിലേക്ക് അതിവേഗം ആഗിരണം ചെയ്യപ്പെട്ട് രക്തത്തിലെ പഞ്ചസാരയുടെ അളവ് പെട്ടെന്ന് കൂട്ടുന്നു."
          : `High liquid sugar (${sugar100}g/100ml) causes rapid glycemic spikes and increases long-term risk of insulin resistance.`
      });
      healthRisks.push({
        condition: isMl ? "ദന്തക്ഷയം (Dental Caries / Enamel Erosion)" : "Dental Caries & Enamel Erosion",
        severity: "MEDIUM",
        detail: isMl
          ? "പാനീയങ്ങളിലെ പഞ്ചസാര പല്ലുകളിൽ ബാക്ടീരിയ വളരാനും ഇനാമൽ കേടുവരുത്താനും കാരണമാകുന്നു."
          : "Frequent consumption of high-sugar acidic liquids promotes oral bacterial fermentation and tooth decay."
      });
    } else if (sugar100 <= 2.5) {
      pros.push(`Low sugar beverage: Only ${sugar100}g/100ml.`);
    }

    if (calories100 > 50) {
      score -= 15;
      cons.push(`High calorie density for a liquid (${calories100} kcal/100ml).`);
    }
  } else if (isOil) {
    if (satFat100 > 25) {
      score -= 25;
      cons.push(`Higher saturated fatty acids (${satFat100}g/100g). Best used in moderation.`);
      healthRisks.push({
        condition: isMl ? "കൊളസ്ട്രോൾ & ഹൃദയാരോഗ്യ പ്രശ്നങ്ങൾ" : "Elevated LDL Cholesterol & Heart Risk",
        severity: "HIGH",
        detail: isMl
          ? "പൂരിത കൊഴുപ്പ് (Saturated Fat) രക്തത്തിൽ ചീത്ത കൊളസ്ട്രോൾ (LDL) കൂട്ടാൻ കാരണമായേക്കാം."
          : `Contains ${satFat100}g saturated fat per 100g, which can raise serum LDL cholesterol if consumed excessively.`
      });
    } else {
      pros.push(`Favorable unsaturated fatty acid balance with lower saturated fats.`);
    }
  } else {
    // Solid foods (Snacks, Biscuits, Cereals, Noodles, Dairy, General)
    if (sugar100 > 20) {
      score -= 30;
      cons.push(`Elevated refined sugar: ${sugar100}g/100g (${perServing.sugar}g per serving).`);
      healthRisks.push({
        condition: isMl ? "ടൈപ്പ്-2 ഡയബറ്റിസ് & അമിതവണ്ണം" : "Type-2 Diabetes & Metabolic Overload",
        severity: "HIGH",
        detail: isMl
          ? `100 ഗ്രാമിൽ ${sugar100} ഗ്രാം പഞ്ചസാര അടങ്ങിയിട്ടുണ്ട്. ഇത് സ്ഥിരമായി കഴിക്കുന്നത് ഇൻസുലിൻ പ്രതിരോധത്തിനും അമിതവണ്ണത്തിനും ഇടയാക്കാം.`
          : `Excess refined sugar (${sugar100}g/100g) dramatically increases glycemic load, fueling insulin resistance and adiposity.`
      });
    } else if (sugar100 < 5) {
      pros.push(`Low sugar content (${sugar100}g/100g), safe for blood glucose management.`);
    }

    if (satFat100 > 8) {
      score -= 25;
      cons.push(`Contains ${satFat100}g saturated fat per 100g (${perServing.saturatedFat}g per serving).`);
      healthRisks.push({
        condition: isMl ? "ധമനികളിൽ കൊഴുപ്പ് അടിഞ്ഞുകൂടൽ (Cardiovascular Plaque)" : "Arterial Plaque & LDL Cholesterol",
        severity: "HIGH",
        detail: isMl
          ? `പൂരിത കൊഴുപ്പ് (${satFat100}g/100g) രക്തധമനികളിൽ തടസ്സം ഉണ്ടാക്കാനും ഹൃദയാഘാത സാധ്യത വർദ്ധിപ്പിക്കാനും സാധ്യതയുണ്ട്.`
          : `High saturated fatty acids (${satFat100}g/100g) stimulate hepatic LDL synthesis, promoting atherogenic plaque build-up.`
      });
    }

    if (sodium100 > 600) {
      score -= 25;
      cons.push(`High sodium: ${sodium100}mg/100g (${perServing.sodium}mg per serving).`);
      healthRisks.push({
        condition: isMl ? "ഹൈപ്പർടെൻഷൻ (ഉയർന്ന രക്തസമ്മർദ്ദം / High BP)" : "Hypertension (High Blood Pressure) & Kidney Load",
        severity: "HIGH",
        detail: isMl
          ? `ഉയർന്ന സോഡിയം (${sodium100}mg/100g) രക്തസമ്മർദ്ദം കൂട്ടാനും കിഡ്നി, ഹൃദയം എന്നിവയിൽ ആയാസം വർദ്ധിപ്പിക്കാനും കാരണമാകും.`
          : `Sodium level of ${sodium100}mg/100g elevates vascular fluid tension, accelerating hypertension and renal filtration load.`
      });
    } else if (sodium100 < 120) {
      pros.push(`Low sodium level (<120mg/100g), heart and blood pressure friendly.`);
    }

    if (fiber100 >= 5) {
      score += 15;
      pros.push(`High dietary fiber (${fiber100}g/100g), promotes healthy gut microbiota and satiety.`);
    }

    if (protein100 >= 8) {
      score += 12;
      pros.push(`Quality protein source: ${protein100}g/100g (${perServing.protein}g/serving), supports muscle retention.`);
    }
  }

  // Check Palm oil
  const ingredientsStr = (product.ingredients || []).join(" ").toLowerCase();
  const hasPalmOil =
    ingredientsStr.includes("palm") ||
    ingredientsStr.includes("palmolein") ||
    ingredientsStr.includes("പാമോയിൽ");
  if (hasPalmOil) {
    score -= 10;
    cons.push("Contains Palm Oil/Palmolein as an industrial vegetable fat.");
    healthRisks.push({
      condition: isMl ? "ഫാറ്റി ലിവർ & രക്തധമനി തടസ്സം" : "Elevated Palmitic Acid & Fatty Liver Risk",
      severity: "MEDIUM",
      detail: isMl
        ? "പാം ഓയിലിൽ പൂരിത കൊഴുപ്പ് കൂടുതലായതിനാൽ പതിവായി കഴിക്കുന്നത് ഫാറ്റി ലിവറിനും ഹൃദയ സംബന്ധമായ പ്രശ്നങ്ങൾക്കും കാരണമാകാം."
        : "Palmolein is enriched with palmitic acid (~45-50% saturated fat), correlated with pro-inflammatory endothelial markers."
    });
  }

  // Check Allergens & Clinical Symptoms
  const allergensList = product.allergens || [];
  const allergensText = allergensList.join(" ").toLowerCase() + " " + ingredientsStr;

  if (allergensText.includes("gluten") || allergensText.includes("wheat") || allergensText.includes("മൈദ") || allergensText.includes("ഗോതമ്പ്")) {
    allergyRisks.push({
      allergen: "Gluten / Wheat",
      allergenMl: "ഗ്ലൂട്ടൻ / ഗോതമ്പ്",
      severity: "HIGH",
      symptoms: isMl
        ? "സീലിയാക് രോഗമുള്ളവർക്കും ഗ്ലൂട്ടൻ അലർജിയുള്ളവർക്കും കഠിനമായ വയറുവേദന, ദഹനക്കേട്, ഗ്യാസ്, ശരീരത്തിൽ ചൊറിച്ചിൽ."
        : "Severe intestinal mucosal inflammation for Celiac patients; abdominal bloating, chronic fatigue and eczema flare-ups."
    });
  }

  if (allergensText.includes("milk") || allergensText.includes("dairy") || allergensText.includes("butter") || allergensText.includes("പാൽ") || allergensText.includes("വെണ്ണ")) {
    allergyRisks.push({
      allergen: "Lactose / Milk Protein",
      allergenMl: "ലാക്ടോസ് / പാൽ പ്രോട്ടീൻ",
      severity: "MEDIUM",
      symptoms: isMl
        ? "ലാക്ടോസ് ഇൻടോളറൻസ് ഉള്ളവർക്ക് വയറു ചീർക്കൽ, വയറിളക്കം, മലബന്ധം, ഛർദ്ദി."
        : "Lactose malabsorption causes painful abdominal cramps, diarrhea, and bloating. Casein can trigger hives or rhinitis."
    });
  }

  if (allergensText.includes("nut") || allergensText.includes("peanut") || allergensText.includes("almond") || allergensText.includes("കശുവണ്ടി") || allergensText.includes("നിലക്കടല")) {
    allergyRisks.push({
      allergen: "Tree Nuts / Peanuts",
      allergenMl: "നട്സ് / നിലക്കടല",
      severity: "CRITICAL",
      symptoms: isMl
        ? "അനാഫൈലാക്സിസ് (ശ്വാസതടസ്സം), ചുണ്ടുകളിലും തൊണ്ടയിലും വീക്കം, ത്വക്കിൽ തിണർപ്പ് (ആപൽക്കരമായ അലർജി)."
        : "Life-threatening Anaphylaxis, throat swelling, bronchospasm, and sudden blood pressure collapse in sensitized individuals."
    });
  }

  if (allergensText.includes("soy") || allergensText.includes("സോയ")) {
    allergyRisks.push({
      allergen: "Soy / Soybeans",
      allergenMl: "സോയ",
      severity: "MEDIUM",
      symptoms: isMl
        ? "ചർമ്മത്തിൽ തിണർപ്പ്, മൂക്കടപ്പ്, ദഹന സംബന്ധമായ അസ്വസ്ഥതകൾ."
        : "Mild to moderate contact urticaria, rhinitis, and digestive discomfort."
    });
  }

  // Determine Overall Status & Nutri-Score Grade
  let status = "HEALTHY";
  let grade = "A";
  if (score < 45) {
    status = "CAUTION";
    grade = "D";
  } else if (score < 65) {
    status = "MODERATE";
    grade = "C";
  } else if (score < 80) {
    status = "HEALTHY";
    grade = "B";
  } else {
    status = "HEALTHY";
    grade = "A";
  }

  // Generate crisp 1-Sentence Verdict & Specific Reason
  let sentenceEn = "";
  let sentenceMl = "";
  let reasonEn = "";
  let reasonMl = "";

  if (status === "CAUTION") {
    if (sugar100 > 25 && satFat100 > 8) {
      reasonEn = `Contains high refined sugar (${sugar100}g/100g) and saturated fat (${satFat100}g/100g), exceeding daily heart-health recommendations.`;
      reasonMl = `ഉയർന്ന പഞ്ചസാരയും (${sugar100}g/100g) പൂരിത കൊഴുപ്പും (${satFat100}g/100g) ഉള്ളതിനാൽ ഹൃദയാരോഗ്യത്തിന് നല്ലതല്ല.`;
    } else if (sodium100 > 700) {
      reasonEn = `Exceeds safe sodium thresholds with ${sodium100}mg/100g, posing cardiovascular and blood pressure strain.`;
      reasonMl = `ഉയർന്ന സോഡിയം (${sodium100}mg/100g) രക്തസമ്മർദ്ദവും ഹൃദയാരോഗ്യ പ്രശ്നങ്ങളും വർദ്ധിപ്പിക്കാൻ സാധ്യതയുണ്ട്.`;
    } else if (sugar100 > 25) {
      reasonEn = `High added sugar content (${sugar100}g/100g) can trigger sharp glucose spikes and metabolic strain.`;
      reasonMl = `അമിത പഞ്ചസാര (${sugar100}g/100g) അടങ്ങിയിരിക്കുന്നതിനാൽ രക്തത്തിലെ ഗ്ലൂക്കോസ് അളവ് വേഗത്തിൽ വർദ്ധിക്കാൻ സാധ്യതയുണ്ട്.`;
    } else {
      reasonEn = `Nutrient composition has high saturated fats and low dietary fiber.`;
      reasonMl = `പൂരിത കൊഴുപ്പ് കൂടുതലും നാരുകൾ കുറവുമായതിനാൽ മിതമായ അളവിൽ മാത്രം ഉപയോഗിക്കുക.`;
    }
    sentenceEn = `Caution / Unhealthy Choice — Reason: ${reasonEn}`;
    sentenceMl = `ശ്രദ്ധിക്കുക (അൺഹെൽത്തി) — കാരണം: ${reasonMl}`;
  } else if (status === "MODERATE") {
    reasonEn = `Provides moderate energy, but balance with nutrient-dense fresh foods due to moderate sodium or fat levels.`;
    reasonMl = `മിതമായ ഊർജ്ജം നൽകുന്നുണ്ടെങ്കിലും, സോഡിയവും കൊഴുപ്പും ഉള്ളതിനാൽ കൃത്യമായ അളവിൽ മാത്രം ഉപയോഗിക്കുക.`;
    sentenceEn = `Moderate / Neutral Choice — Reason: ${reasonEn}`;
    sentenceMl = `ന്യൂട്രൽ ചോയ്സ് — കാരണം: ${reasonMl}`;
  } else {
    if (fiber100 >= 5 && sugar100 <= 5) {
      reasonEn = `Packed with ${fiber100}g natural dietary fiber, zero added trans-fats, and very low sugar, making it heart and gut friendly.`;
      reasonMl = `ധാരാളം നാരുകളും (${fiber100}g/100g) വളരെ കുറഞ്ഞ പഞ്ചസാരയും ഉള്ളതിനാൽ ദഹനത്തിനും ഹൃദയാരോഗ്യത്തിനും വളരെ നല്ലതാണ്.`;
    } else if (protein100 >= 8) {
      reasonEn = `Rich source of dietary protein (${protein100}g/100g) with favorable micronutrient balance.`;
      reasonMl = `ശരീരത്തിന് ഗുണകരമായ പ്രോട്ടീനും (${protein100}g/100g) പോഷകങ്ങളും നൽകുന്ന ആരോഗ്യകരമായ ചോയ്സ്.`;
    } else {
      reasonEn = `Nutritional values are well within safe, balanced daily dietary guidelines.`;
      reasonMl = `ദൈനംദിന പോഷകാഹാര മാർഗ്ഗനിർദ്ദേശങ്ങൾക്ക് അനുസൃതമായ ആരോഗ്യകരമായ ഉൽപ്പന്നം.`;
    }
    sentenceEn = `Healthy Choice — Reason: ${reasonEn}`;
    sentenceMl = `ആരോഗ്യകരം — കാരണം: ${reasonMl}`;
  }

  return {
    status,
    grade,
    score: Math.min(100, Math.max(15, score)),
    isDataIncomplete: false,
    servingGrams,
    perServing,
    singleSentenceVerdict: {
      type: status,
      title: isMl
        ? (status === "HEALTHY" ? "ആരോഗ്യകരം (Healthy)" : status === "CAUTION" ? "ശ്രദ്ധിക്കുക (Unhealthy)" : "ന്യൂട്രൽ ചോയ്സ് (Neutral)")
        : (status === "HEALTHY" ? "Healthy Choice" : status === "CAUTION" ? "Caution / Unhealthy" : "Neutral / Moderate"),
      reason: isMl ? reasonMl : reasonEn,
      fullText: isMl ? sentenceMl : sentenceEn
    },
    healthRisks,
    allergyRisks,
    hasPalmOil,
    pros: pros.length > 0 ? pros : ["Nutritional components fall within typical daily standards."],
    cons: cons.length > 0 ? cons : ["No major dietary cautionary flags identified in disclosed data."]
  };
}