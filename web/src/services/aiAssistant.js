/**
 * Guarded Grocery AI Assistant & Knowledge Base
 * Scope: Food ingredients, grocery shopping intelligence, unit price analysis, allergen awareness.
 * Guardrails: Strictly prohibits medical diagnoses or prescribing treatments.
 * Cost Control: Local knowledge base + 10 questions session rate limit.
 */

const MAX_SESSION_QUESTIONS = 10;
let sessionQuestionsAsked = 0;

export function getSessionQuestionCount() {
  return sessionQuestionsAsked;
}

export function isRateLimitReached() {
  return sessionQuestionsAsked >= MAX_SESSION_QUESTIONS;
}

export async function askGroceryAssistant(userQuery, activeProduct = null, language = "en") {
  if (isRateLimitReached()) {
    return {
      success: false,
      isRateLimited: true,
      message: "Session limit of 10 questions reached. Please refresh the page to start a new inquiry session."
    };
  }

  sessionQuestionsAsked++;
  const queryLower = (userQuery || "").toLowerCase();

  // Guardrail 1: Strictly reject medical diagnosis requests
  const medicalKeywords = ["cure", "disease", "medicine", "prescribe", "treatment", "രോഗം", "ചികിത്സ", "മരുന്ന്"];
  const isMedicalQuery = medicalKeywords.some((w) => queryLower.includes(w));
  if (isMedicalQuery) {
    return {
      success: true,
      answer: language === "ml"
        ? "ശ്രദ്ധിക്കുക: ഞാൻ ഒരു ഗ്രോസറി അസിസ്റ്റന്റാണ്. രോഗങ്ങൾക്കുള്ള ചികിത്സയോ മരുന്നോ നിർദ്ദേശിക്കാൻ എനിക്ക് അനുമതിയില്ല. ആരോഗ്യ സംബന്ധമായ സംശയങ്ങൾക്ക് ദയവായി ഒരു ഡോക്ടറെയോ ക്ലിനിക്കൽ ഡയറ്റീഷ്യനെയോ സമീപിക്കുക."
        : "Safety Notice: As a grocery intelligence assistant, I cannot provide medical diagnoses or prescribe medical treatments. Please consult a qualified healthcare professional for medical inquiries.",
      isMedicalWarning: true
    };
  }

  // Knowledge base responses for grocery queries
  if (queryLower.includes("palm oil") || queryLower.includes("പാമോയിൽ")) {
    return {
      success: true,
      answer: language === "ml"
        ? "പാമോയിൽ (Palm Oil) ബിസ്ക്കറ്റുകളിലും ലഘുഭക്ഷണങ്ങളിലും ഘടനയും ഷെൽഫ്-ലൈഫും കൂട്ടാൻ സാധാരണയായി ഉപയോഗിക്കുന്ന എണ്ണയാണ്. ഇതിൽ പൂരിത കൊഴുപ്പ് (Saturated Fat) ഏകദേശം 50% ഉണ്ട്. അളവ് നിയന്ത്രിച്ചു കഴിക്കുന്നതാണ് ഹൃദയാരോഗ്യത്തിന് നല്ലത്."
        : "Palm oil is widely used in packaged biscuits and snacks to provide texture and longer shelf stability. It contains around 50% saturated fat. Consuming it in moderation is recommended for cardiovascular balance."
    };
  }

  if (queryLower.includes("diabetic") || queryLower.includes("sugar") || queryLower.includes("പ്രമേഹം") || queryLower.includes("പഞ്ചസാര")) {
    return {
      success: true,
      answer: language === "ml"
        ? "പ്രമേഹമുള്ളവരും പഞ്ചസാര നിയന്ത്രിക്കുന്നവരും ഉൽപ്പന്നങ്ങളിലെ 'Added Sugars' പ്രത്യേകം ശ്രദ്ധിക്കണം. 100 ഗ്രാമിൽ 5 ഗ്രാമിൽ താഴെ പഞ്ചസാരയുള്ളതും, ഉയർന്ന ഫൈബർ (ഉദാ: 100% റോൾഡ് ഓട്സ്) ഉള്ളതുമായ ഭക്ഷണങ്ങളാണ് കൂടുതൽ അനുയോജ്യം."
        : "For sugar-conscious diets, always check the 'Added Sugars' row. Foods with less than 5g sugar per 100g and high dietary fiber (such as whole rolled oats) are generally preferred over processed sugary cereals."
    };
  }

  if (queryLower.includes("ins") || queryLower.includes("e-") || queryLower.includes("500") || queryLower.includes("additive")) {
    return {
      success: true,
      answer: language === "ml"
        ? "INS (International Numbering System) എന്നത് ഭക്ഷ്യ ചേരുവകൾക്കുള്ള ആഗോള കോഡാണ്. ഉദാഹരണത്തിന്, INS 500ii എന്നാൽ സാധാരണ സോഡിയം ബൈകാർബണേറ്റ് (ബേക്കിംഗ് സോഡ) ആണ്. ബിസ്ക്കറ്റുകൾ മൃദുവാക്കാൻ ഇത് ഉപയോഗിക്കുന്നു."
        : "INS codes (like INS 500ii) identify standardized food additives approved by food authorities. INS 500ii is simply Sodium Bicarbonate (baking soda), used to leaven biscuits and baked goods."
    };
  }

  if (queryLower.includes("true value") || queryLower.includes("unit price") || queryLower.includes("യൂണിറ്റ്")) {
    return {
      success: true,
      answer: language === "ml"
        ? "ട്രൂ വാല്യൂ (Unit Price) എന്നാൽ 100 ഗ്രാമിന് അല്ലെങ്കിൽ 100 മില്ലിക്ക് വരുന്ന തുകയാണ്. ഒരു പാക്കറ്റിന്റെ മൊത്തം വിലയേക്കാൾ 100 ഗ്രാമിന്റെ വില നോക്കിയാലാണ് വലിയ പാക്കറ്റുകൾ യഥാർത്ഥത്തിൽ ലാഭമാണോ എന്ന് മനസ്സിലാക്കാൻ സാധിക്കുക."
        : "True Value (Unit Price) normalizes the price per 100g or 100ml. A larger pack may have a higher total price, but its unit price per 100g tells you if you are genuinely getting better value."
    };
  }

  // Active product contextual answer
  if (activeProduct) {
    return {
      success: true,
      answer: language === "ml"
        ? `${activeProduct.name} എന്ന ഉൽപ്പന്നത്തിൽ 100 ഗ്രാമിൽ ${activeProduct.nutritionalInfo?.sugar ?? "അപൂർണ്ണമായ"}g പഞ്ചസാരയും, ${activeProduct.nutritionalInfo?.protein ?? "അപൂർണ്ണമായ"}g പ്രോട്ടീനും അടങ്ങിയിട്ടുണ്ട്. ഇതിന്റെ യൂണിറ്റ് വില ₹${((activeProduct.price / (activeProduct.packageSize?.value || 100)) * 100).toFixed(2)}/100g ആണ്.`
        : `${activeProduct.name} contains ${activeProduct.nutritionalInfo?.sugar ?? "N/A"}g sugar and ${activeProduct.nutritionalInfo?.protein ?? "N/A"}g protein per 100g. Its True Value unit price is ₹${((activeProduct.price / (activeProduct.packageSize?.value || 100)) * 100).toFixed(2)} per 100g.`
    };
  }

  return {
    success: true,
    answer: language === "ml"
      ? "നിങ്ങളുടെ ഗ്രോസറി ചോദ്യം രേഖപ്പെടുത്തി. ഭക്ഷണ ചേരുവകൾ, ഷുഗർ അളവ്, അല്ലെങ്കിൽ രണ്ട് ഉൽപ്പന്നങ്ങളുടെ വില താരതമ്യം എന്നിവയെക്കുറിച്ച് ചോദിക്കാം."
      : "I am ready to help with your grocery inquiries. You can ask about ingredients, comparing two products, or understanding unit prices."
  };
}
