import React from "react";
import {
  Camera,
  FileUp,
  ShieldCheck,
  ShieldAlert,
  Shield,
  AlertTriangle,
  Flame,
  Dna,
  Wheat,
  CheckCircle2,
  Sparkles,
  Info
} from "lucide-react";
import { evaluateNutrition } from "../../utils/nutritionEvaluator";
import { isFoodProduct } from "../../utils/unitPriceCalculator";

export default function HealthInspectorScreen({
  activeProduct,
  onOpenScanner,
  onOpenOcr,
  onSelectProduct,
  productsList,
  isMalayalam,
  t
}) {
  const foodProducts = (productsList || []).filter(p => isFoodProduct(p));
  
  // If activeProduct is not a food product, fall back to the first food product or null
  const currentFood = isFoodProduct(activeProduct) ? activeProduct : foodProducts[0] || null;

  const evaluation = currentFood ? evaluateNutrition(currentFood) : null;
  const displayName = isMalayalam && currentFood?.nameMl ? currentFood.nameMl : currentFood?.name;

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn">
      {/* 1. Header Banner & Scan Triggers */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.tabs.health}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.healthInspector.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            {t.healthInspector.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenScanner}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{t.scanBtn}</span>
            </button>

            <button
              onClick={onOpenOcr}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileUp className="w-4 h-4 text-emerald-400" />
              <span>{t.uploadOcrBtn}</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Notice if incoming item wasn't food */}
      {activeProduct && !isFoodProduct(activeProduct) && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-center gap-3 text-sky-900">
          <Info className="w-5 h-5 text-sky-600 shrink-0" />
          <p className="text-xs">
            {t.healthInspector.foodOnlyNotice || "The Health Inspector evaluates nutritional contents of food items. Displaying a healthy food recommendation below."}
          </p>
        </div>
      )}

      {currentFood ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
          {/* 2. Inspected Product Profile Header */}
          <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex items-center gap-5">
              <img
                src={currentFood.imageUrl}
                alt={displayName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {currentFood.brand} • {currentFood.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {displayName}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                  <span>Net: {currentFood.packageSize?.value}{currentFood.packageSize?.unit}</span>
                  <span>•</span>
                  <span>{t.healthInspector.servingSizeInfo}: {currentFood.nutritionalInfo?.servingSize || "100g"}</span>
                  <span>•</span>
                  <span>Barcode: {currentFood.barcode}</span>
                </div>
              </div>
            </div>

            {/* Health Evaluation Badge */}
            <div className="shrink-0">
              {evaluation?.status === "INCOMPLETE" ? (
                <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <div>
                    <span className="font-bold text-xs block">{t.healthInspector.incompleteData}</span>
                    <span className="text-[10px] text-amber-700">Automated grading withheld</span>
                  </div>
                </div>
              ) : evaluation?.status === "HEALTHY" ? (
                <div className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">{t.healthInspector.wholesome}</span>
                    <span className="text-[10px] text-emerald-700">WHO / FSSAI Nutri-Score Grade A/B</span>
                  </div>
                </div>
              ) : evaluation?.status === "MODERATE" ? (
                <div className="px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-amber-600" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">{t.healthInspector.moderate}</span>
                    <span className="text-[10px] text-amber-700">Balanced macronutrient profile</span>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-rose-600" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">{t.healthInspector.caution}</span>
                    <span className="text-[10px] text-rose-700">Contains high sugar, sodium or fat</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Incomplete Data Detailed Alert if applicable */}
          {evaluation?.isDataIncomplete && (
            <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-300 flex items-start gap-3 text-xs text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-1">{t.healthInspector.incompleteData}</span>
                <p className="leading-relaxed">{t.healthInspector.incompleteExplanation}</p>
                <span className="text-[11px] text-amber-700 mt-2 block font-semibold">
                  Missing Fields: {evaluation.missingFields?.join(", ") || "Key macronutrients"}
                </span>
              </div>
            </div>
          )}

          {/* 3. Visual Nutrient Meters Grid (Protein, Fiber, Sugar, Saturated Fat, Sodium, Calories) */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Nutritional Breakdown (per 100g / 100ml)
              </h3>
              <span className="text-xs font-bold text-slate-400">
                Serving: {currentFood.nutritionalInfo?.servingSize || "100g"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* Calories */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                <span className="text-[10px] text-slate-500 uppercase font-bold block">{t.healthInspector.caloriesInfo}</span>
                <span className="text-base font-black text-slate-800">
                  {currentFood.nutritionalInfo?.calories ?? "N/A"}
                </span>
                <span className="text-[10px] text-slate-400 block">kcal</span>
              </div>

              {/* Protein */}
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-center">
                <Dna className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">{t.healthInspector.proteinMeter}</span>
                <span className="text-base font-black text-emerald-900">
                  {currentFood.nutritionalInfo?.protein !== null && currentFood.nutritionalInfo?.protein !== undefined ? `${currentFood.nutritionalInfo.protein}g` : "N/A"}
                </span>
                <span className="text-[10px] text-emerald-600 block">per 100g</span>
              </div>

              {/* Fiber */}
              <div className="p-3 bg-teal-50/60 rounded-2xl border border-teal-100 text-center">
                <Wheat className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <span className="text-[10px] text-teal-800 uppercase font-bold block">{t.healthInspector.fiberMeter}</span>
                <span className="text-base font-black text-teal-900">
                  {currentFood.nutritionalInfo?.fiber !== null && currentFood.nutritionalInfo?.fiber !== undefined ? `${currentFood.nutritionalInfo.fiber}g` : "N/A"}
                </span>
                <span className="text-[10px] text-teal-600 block">per 100g</span>
              </div>

              {/* Sugar */}
              <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100 text-center">
                <span className="text-[10px] text-amber-800 uppercase font-bold block">{t.healthInspector.sugarMeter}</span>
                <span className="text-base font-black text-amber-900">
                  {currentFood.nutritionalInfo?.sugar !== null && currentFood.nutritionalInfo?.sugar !== undefined ? `${currentFood.nutritionalInfo.sugar}g` : "N/A"}
                </span>
                <span className="text-[10px] text-amber-600 block">per 100g</span>
              </div>

              {/* Saturated Fat */}
              <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-100 text-center">
                <span className="text-[10px] text-rose-800 uppercase font-bold block">{t.healthInspector.fatMeter}</span>
                <span className="text-base font-black text-rose-900">
                  {currentFood.nutritionalInfo?.saturatedFat !== null && currentFood.nutritionalInfo?.saturatedFat !== undefined ? `${currentFood.nutritionalInfo.saturatedFat}g` : "N/A"}
                </span>
                <span className="text-[10px] text-rose-600 block">per 100g</span>
              </div>

              {/* Sodium */}
              <div className="p-3 bg-sky-50/60 rounded-2xl border border-sky-100 text-center">
                <span className="text-[10px] text-sky-800 uppercase font-bold block">{t.healthInspector.sodiumMeter}</span>
                <span className="text-base font-black text-sky-900">
                  {currentFood.nutritionalInfo?.sodium !== null && currentFood.nutritionalInfo?.sodium !== undefined ? `${currentFood.nutritionalInfo.sodium}mg` : "N/A"}
                </span>
                <span className="text-[10px] text-sky-600 block">per 100g</span>
              </div>
            </div>

            {/* 4. Category-Aware Alarms & Pros */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Wholesome Attributes */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <h4 className="font-bold text-xs sm:text-sm text-emerald-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Wholesome Attributes
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-900">
                  {evaluation?.pros?.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Caution & Alarm Flags */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <h4 className="font-bold text-xs sm:text-sm text-amber-900 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" /> {t.healthInspector.healthAlarmTitle}
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-900">
                  {evaluation?.cons?.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 5. Allergens & Ingredients */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1">
                  {t.healthInspector.allergensDetected}:
                </span>
                {currentFood.allergens && currentFood.allergens.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentFood.allergens.map((alg, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        ⚠️ {alg}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">{t.healthInspector.noAllergens}</span>
                )}
              </div>

              <div>
                <span className="text-xs font-bold text-slate-800 block mb-1">
                  {t.healthInspector.ingredientsList}:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {currentFood.ingredients?.join(", ") || "Ingredients details not provided."}
                </p>
              </div>
            </div>

          </div>
        </div>
      ) : null}

      {/* 6. Quick Switcher: Select other food items from catalog */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          Select another food product to inspect:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {foodProducts.map((p) => {
            const isSelected = currentFood?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-20 object-cover rounded-xl mb-1.5"
                />
                <span className="text-[11px] font-bold text-slate-800 line-clamp-1 block">
                  {isMalayalam && p.nameMl ? p.nameMl : p.name}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {p.packageSize?.value}{p.packageSize?.unit} • ₹{p.price}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
