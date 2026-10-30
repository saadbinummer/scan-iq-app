import React from "react";
import {
  Scale,
  ArrowLeftRight,
  Trash2,
  TrendingDown,
  Sparkles,
  AlertTriangle,
  Layers,
  Info,
  CheckCircle2,
  Check,
  Plus,
  Cpu,
  Star
} from "lucide-react";
import { compareProducts, calculateUnitPrice, isFoodProduct } from "../../utils/unitPriceCalculator";
import { evaluateNutrition } from "../../utils/nutritionEvaluator";

export default function ComparisonScreen({
  slot1,
  slot2,
  onSetSlot1,
  onSetSlot2,
  onSwapSlots,
  onClearSlot1,
  onClearSlot2,
  productsList,
  isMalayalam,
  t
}) {
  const comparison = slot1 && slot2 ? compareProducts(slot1, slot2) : null;
  const isFoodA = isFoodProduct(slot1);
  const isFoodB = isFoodProduct(slot2);
  const bothFood = isFoodA && isFoodB;
  const bothTech = !isFoodA && !isFoodB;

  const eval1 = isFoodA ? evaluateNutrition(slot1) : null;
  const eval2 = isFoodB ? evaluateNutrition(slot2) : null;

  const name1 = isMalayalam && slot1?.nameMl ? slot1.nameMl : slot1?.name;
  const name2 = isMalayalam && slot2?.nameMl ? slot2.nameMl : slot2?.name;

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.tabs.compare}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.comparison.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.comparison.subtitle}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Active Comparison Slots Control */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Slot 1 Box */}
          <div className="flex-1 w-full bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {slot1 ? (
                <img
                  src={slot1.imageUrl}
                  alt={name1}
                  className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-200 p-0.5"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 font-bold">
                  1
                </div>
              )}
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {t.comparison.compareSlot1}
                </span>
                <span className="font-bold text-sm text-slate-900 line-clamp-1">
                  {slot1 ? name1 : t.comparison.selectSlotPrompt}
                </span>
                {slot1 && (
                  <span className="text-xs text-emerald-700 font-semibold">
                    ₹{slot1.price.toLocaleString()} {isFoodA ? `(${slot1.packageSize?.value}${slot1.packageSize?.unit})` : `• ${slot1.category}`}
                  </span>
                )}
              </div>
            </div>
            {slot1 && (
              <button
                onClick={onClearSlot1}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Swap Slots Button */}
          <button
            onClick={onSwapSlots}
            disabled={!slot1 || !slot2}
            className="p-3 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded-2xl transition-all disabled:opacity-30 cursor-pointer shrink-0"
            title={t.comparison.swap}
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>

          {/* Slot 2 Box */}
          <div className="flex-1 w-full bg-teal-50/70 border border-teal-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {slot2 ? (
                <img
                  src={slot2.imageUrl}
                  alt={name2}
                  className="w-12 h-12 rounded-xl object-contain bg-white border border-slate-200 p-0.5"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400 font-bold">
                  2
                </div>
              )}
              <div>
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                  {t.comparison.compareSlot2}
                </span>
                <span className="font-bold text-sm text-slate-900 line-clamp-1">
                  {slot2 ? name2 : t.comparison.selectSlotPrompt}
                </span>
                {slot2 && (
                  <span className="text-xs text-teal-700 font-semibold">
                    ₹{slot2.price.toLocaleString()} {isFoodB ? `(${slot2.packageSize?.value}${slot2.packageSize?.unit})` : `• ${slot2.category}`}
                  </span>
                )}
              </div>
            </div>
            {slot2 && (
              <button
                onClick={onClearSlot2}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 3. True Value & Detailed Comparison Results */}
      {slot1 && slot2 && comparison ? (
        <div className="bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden">
          
          {/* Category Fairness Check Alert */}
          {!comparison.isSameCategory ? (
            <div className="p-4 bg-amber-50 border-b border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                {t.comparison.categoryMismatchWarning
                  .replace("{cat1}", slot1.category)
                  .replace("{cat2}", slot2.category)}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border-b border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>{t.comparison.categoryMatch.replace("{cat}", slot1.category)}</span>
            </div>
          )}

          {/* True Value Unit Price Head-to-Head */}
          <div className="p-6 sm:p-8 bg-emerald-50/40 border-b border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base mb-4">
              <TrendingDown className="w-5 h-5 text-emerald-600" />
              <span>{t.comparison.trueValueHeader}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product 1 Unit Price */}
              <div className={`p-5 rounded-2xl border transition-all ${
                comparison.betterValue === "A"
                  ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                  : "bg-white border-slate-200"
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-500">{name1}</span>
                  {comparison.betterValue === "A" && (
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3 h-3" /> {t.comparison.betterValue}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-black text-slate-900">
                  ₹{comparison.unitA.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {comparison.unitUnit}</span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Total ₹{slot1.price.toLocaleString()} {isFoodA ? `for ${slot1.packageSize?.value}${slot1.packageSize?.unit}` : "per unit"}
                </span>
              </div>

              {/* Product 2 Unit Price */}
              <div className={`p-5 rounded-2xl border transition-all ${
                comparison.betterValue === "B"
                  ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                  : "bg-white border-slate-200"
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-500">{name2}</span>
                  {comparison.betterValue === "B" && (
                    <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3 h-3" /> {t.comparison.betterValue}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-black text-slate-900">
                  ₹{comparison.unitB.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ {comparison.unitUnit}</span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Total ₹{slot2.price.toLocaleString()} {isFoodB ? `for ${slot2.packageSize?.value}${slot2.packageSize?.unit}` : "per unit"}
                </span>
              </div>
            </div>

            {/* Savings Callout */}
            {comparison.betterValue !== "EQUAL" && (
              <div className="mt-4 text-center text-xs font-bold text-emerald-800 bg-emerald-100/80 py-2.5 rounded-xl">
                🎉 {comparison.betterValue === "A" ? name1 : name2} {t.comparison.savingAlert.replace("{pct}", comparison.savingsPercent)}
              </div>
            )}
          </div>

          {/* CONDITIONAL SPECIFICATIONS / NUTRITION COMPARISON */}
          {bothFood ? (
            /* Food Nutrition Side-by-Side */
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                    <Info className="w-5 h-5 text-emerald-600" />
                    <span>{isMalayalam ? "പോക്ഷകമൂല്യവും ആരോഗ്യവും നേർക്കുനേർ താരതമ്യം" : "Comprehensive Nutrition & Health Matrix"}</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isMalayalam
                      ? "പ്രൈസ് മാത്രമല്ല, കലോറി, പഞ്ചസാര, പ്രോട്ടീൻ, ഉപ്പ്, പാം-ഓയിൽ എന്നിവയുടെ സമഗ്ര താരതമ്യം."
                      : "Head-to-head evaluation of calories, sugars, proteins, sodium, and ingredients per 100g."}
                  </p>
                </div>

                {/* Clear Health Winner Badge */}
                {eval1 && eval2 && !eval1.isDataIncomplete && !eval2.isDataIncomplete && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Healthier Choice:</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full font-black text-xs flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {eval1.score >= eval2.score ? name1 : name2}
                    </span>
                  </div>
                )}
              </div>

              {/* 1-Sentence Health Verdict & Grade Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product 1 Verdict */}
                <div className={`p-4 rounded-2xl border ${
                  eval1?.status === "HEALTHY" ? "bg-emerald-50/70 border-emerald-200" : eval1?.status === "CAUTION" ? "bg-rose-50/70 border-rose-200" : "bg-amber-50/70 border-amber-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-slate-900 text-sm truncate">{name1}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white shadow-2xs">
                      Nutri-Grade: <strong>{eval1?.grade || "N/A"}</strong>
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-snug">
                    {eval1?.singleSentenceVerdict?.fullText || "Nutritional evaluation active."}
                  </p>
                </div>

                {/* Product 2 Verdict */}
                <div className={`p-4 rounded-2xl border ${
                  eval2?.status === "HEALTHY" ? "bg-emerald-50/70 border-emerald-200" : eval2?.status === "CAUTION" ? "bg-rose-50/70 border-rose-200" : "bg-amber-50/70 border-amber-200"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-slate-900 text-sm truncate">{name2}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white shadow-2xs">
                      Nutri-Grade: <strong>{eval2?.grade || "N/A"}</strong>
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-snug">
                    {eval2?.singleSentenceVerdict?.fullText || "Nutritional evaluation active."}
                  </p>
                </div>
              </div>

              {/* Detailed Matrix Table */}
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-xs sm:text-sm border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                      <th className="py-3 px-4 font-semibold w-1/3">Nutrient / Metric (per 100g)</th>
                      <th className="py-3 px-4 font-bold text-emerald-950 bg-emerald-50/50">{name1}</th>
                      <th className="py-3 px-4 font-bold text-teal-950 bg-teal-50/50">{name2}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-4 font-medium text-slate-600">Package Size</td>
                      <td className="py-2.5 px-4 text-slate-800 font-bold">{slot1.packageSize?.value}{slot1.packageSize?.unit}</td>
                      <td className="py-2.5 px-4 text-slate-800 font-bold">{slot2.packageSize?.value}{slot2.packageSize?.unit}</td>
                    </tr>
                    <tr className="bg-slate-50/40">
                      <td className="py-2.5 px-4 font-medium text-slate-600">Unit Price (₹/100g)</td>
                      <td className={`py-2.5 px-4 font-black ${comparison.betterValue === "A" ? "text-emerald-600" : "text-slate-800"}`}>
                        ₹{comparison.unitA} {comparison.betterValue === "A" && "✓ Cheaper"}
                      </td>
                      <td className={`py-2.5 px-4 font-black ${comparison.betterValue === "B" ? "text-emerald-600" : "text-slate-800"}`}>
                        ₹{comparison.unitB} {comparison.betterValue === "B" && "✓ Cheaper"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-medium text-slate-600">Calories (Energy)</td>
                      <td className="py-2.5 px-4 text-slate-800 font-bold">{slot1.nutritionalInfo?.calories ?? "-"} kcal</td>
                      <td className="py-2.5 px-4 text-slate-800 font-bold">{slot2.nutritionalInfo?.calories ?? "-"} kcal</td>
                    </tr>
                    <tr className="bg-slate-50/40">
                      <td className="py-2.5 px-4 font-medium text-slate-600">Refined Sugar</td>
                      <td className={`py-2.5 px-4 font-bold ${Number(slot1.nutritionalInfo?.sugar || 0) < Number(slot2.nutritionalInfo?.sugar || 0) ? "text-emerald-700 bg-emerald-50/40" : "text-amber-700"}`}>
                        {slot1.nutritionalInfo?.sugar !== null && slot1.nutritionalInfo?.sugar !== undefined ? `${slot1.nutritionalInfo.sugar}g` : "-"}
                      </td>
                      <td className={`py-2.5 px-4 font-bold ${Number(slot2.nutritionalInfo?.sugar || 0) < Number(slot1.nutritionalInfo?.sugar || 0) ? "text-emerald-700 bg-emerald-50/40" : "text-amber-700"}`}>
                        {slot2.nutritionalInfo?.sugar !== null && slot2.nutritionalInfo?.sugar !== undefined ? `${slot2.nutritionalInfo.sugar}g` : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-medium text-slate-600">Protein (Muscle Building)</td>
                      <td className={`py-2.5 px-4 font-bold ${Number(slot1.nutritionalInfo?.protein || 0) > Number(slot2.nutritionalInfo?.protein || 0) ? "text-emerald-700 bg-emerald-50/40" : "text-slate-800"}`}>
                        {slot1.nutritionalInfo?.protein !== null && slot1.nutritionalInfo?.protein !== undefined ? `${slot1.nutritionalInfo.protein}g` : "-"}
                      </td>
                      <td className={`py-2.5 px-4 font-bold ${Number(slot2.nutritionalInfo?.protein || 0) > Number(slot1.nutritionalInfo?.protein || 0) ? "text-emerald-700 bg-emerald-50/40" : "text-slate-800"}`}>
                        {slot2.nutritionalInfo?.protein !== null && slot2.nutritionalInfo?.protein !== undefined ? `${slot2.nutritionalInfo.protein}g` : "-"}
                      </td>
                    </tr>
                    <tr className="bg-slate-50/40">
                      <td className="py-2.5 px-4 font-medium text-slate-600">Dietary Fiber (Gut Health)</td>
                      <td className={`py-2.5 px-4 font-bold ${Number(slot1.nutritionalInfo?.fiber || 0) > Number(slot2.nutritionalInfo?.fiber || 0) ? "text-emerald-700 bg-emerald-50/40" : "text-slate-800"}`}>
                        {slot1.nutritionalInfo?.fiber !== null && slot1.nutritionalInfo?.fiber !== undefined ? `${slot1.nutritionalInfo.fiber}g` : "-"}
                      </td>
                      <td className={`py-2.5 px-4 font-bold ${Number(slot2.nutritionalInfo?.fiber || 0) > Number(slot1.nutritionalInfo?.fiber || 0) ? "text-emerald-700 bg-emerald-50/40" : "text-slate-800"}`}>
                        {slot2.nutritionalInfo?.fiber !== null && slot2.nutritionalInfo?.fiber !== undefined ? `${slot2.nutritionalInfo.fiber}g` : "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-medium text-slate-600">Sodium (Salt)</td>
                      <td className={`py-2.5 px-4 font-bold ${Number(slot1.nutritionalInfo?.sodium || 0) < Number(slot2.nutritionalInfo?.sodium || 0) ? "text-emerald-700 bg-emerald-50/40" : "text-slate-800"}`}>
                        {slot1.nutritionalInfo?.sodium !== null && slot1.nutritionalInfo?.sodium !== undefined ? `${slot1.nutritionalInfo.sodium}mg` : "-"}
                      </td>
                      <td className={`py-2.5 px-4 font-bold ${Number(slot2.nutritionalInfo?.sodium || 0) < Number(slot1.nutritionalInfo?.sodium || 0) ? "text-emerald-700 bg-emerald-50/40" : "text-slate-800"}`}>
                        {slot2.nutritionalInfo?.sodium !== null && slot2.nutritionalInfo?.sodium !== undefined ? `${slot2.nutritionalInfo.sodium}mg` : "-"}
                      </td>
                    </tr>
                    <tr className="bg-slate-50/40">
                      <td className="py-2.5 px-4 font-medium text-slate-600">Palm Oil / Palmolein</td>
                      <td className="py-2.5 px-4 font-bold">
                        {eval1?.hasPalmOil ? <span className="text-rose-600">⚠️ Yes</span> : <span className="text-emerald-600">✓ No</span>}
                      </td>
                      <td className="py-2.5 px-4 font-bold">
                        {eval2?.hasPalmOil ? <span className="text-rose-600">⚠️ Yes</span> : <span className="text-emerald-600">✓ No</span>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Pros & Cons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-800 block text-sm">{name1}</span>
                  <div className="text-emerald-800">
                    <span className="font-bold block mb-1">✓ Positives:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      {eval1?.pros?.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div className="text-rose-800 pt-1">
                    <span className="font-bold block mb-1">⚠ Cautions:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      {eval1?.cons?.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-800 block text-sm">{name2}</span>
                  <div className="text-emerald-800">
                    <span className="font-bold block mb-1">✓ Positives:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      {eval2?.pros?.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div className="text-rose-800 pt-1">
                    <span className="font-bold block mb-1">⚠ Cautions:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      {eval2?.cons?.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : bothTech ? (
            /* Electronics Technical Specs Side-by-Side */
            <div className="p-6 sm:p-8">
              <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-sky-600" /> Side-by-Side Hardware Specifications
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                      <th className="py-3 px-4 font-semibold w-1/4">Specification</th>
                      <th className="py-3 px-4 font-bold text-emerald-950 bg-emerald-50/50">{name1}</th>
                      <th className="py-3 px-4 font-bold text-teal-950 bg-teal-50/50">{name2}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-4 font-medium text-slate-600">Brand / Maker</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{slot1.brand}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{slot2.brand}</td>
                    </tr>
                    <tr className="bg-slate-50/40">
                      <td className="py-3 px-4 font-medium text-slate-600">User Rating</td>
                      <td className="py-3 px-4 text-amber-600 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> {slot1.ratings?.average || "4.5"} / 5
                      </td>
                      <td className="py-3 px-4 text-amber-600 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500" /> {slot2.ratings?.average || "4.5"} / 5
                      </td>
                    </tr>
                    {slot1.specs && Object.keys(slot1.specs).map((specKey) => (
                      <tr key={specKey} className="border-t border-slate-100">
                        <td className="py-3 px-4 font-medium text-slate-600">{specKey.replace(/_/g, " ")}</td>
                        <td className="py-3 px-4 text-slate-800 font-medium">{slot1.specs[specKey] || "-"}</td>
                        <td className="py-3 px-4 text-slate-800 font-medium">{slot2.specs?.[specKey] || "-"}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50/40">
                      <td className="py-3 px-4 font-medium text-slate-600">Warranty</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">{slot1.warranty || "1 Year"}</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">{slot2.warranty || "1 Year"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Mixed Categories Side-by-Side */
            <div className="p-6 sm:p-8">
              <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-600" /> Overview Comparison
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-sm block mb-1">{name1}</span>
                  <span className="text-xs text-slate-500 block mb-2">{slot1.category} • {slot1.brand}</span>
                  <span className="text-lg font-black text-slate-900">₹{slot1.price.toLocaleString()}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-sm block mb-1">{name2}</span>
                  <span className="text-xs text-slate-500 block mb-2">{slot2.category} • {slot2.brand}</span>
                  <span className="text-lg font-black text-slate-900">₹{slot2.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

        </div>
      ) : null}

      {/* 4. Product Catalog Selection to assign Slot 1 or Slot 2 */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          Select items to load into comparison slots:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {productsList.map((product) => {
            const isSlot1 = slot1?.id === product.id;
            const isSlot2 = slot2?.id === product.id;
            const isFood = isFoodProduct(product);
            const unitPrice = calculateUnitPrice(product.price, product.packageSize, product.productType);

            return (
              <div
                key={product.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-contain bg-white border border-slate-200 p-0.5"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{product.brand}</span>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                      {isMalayalam && product.nameMl ? product.nameMl : product.name}
                    </h4>
                    <span className="text-xs font-bold text-emerald-700">
                      ₹{product.price.toLocaleString()}{" "}
                      <span className="text-[10px] font-normal text-slate-500">
                        {isFood ? `(₹${unitPrice}/100g)` : `• ${product.category}`}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => onSetSlot1(product)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSlot1
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-300"
                    }`}
                  >
                    {isSlot1 ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>Slot 1</span>
                  </button>

                  <button
                    onClick={() => onSetSlot2(product)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSlot2
                        ? "bg-teal-600 text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-teal-50 border border-slate-300"
                    }`}
                  >
                    {isSlot2 ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>Slot 2</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
