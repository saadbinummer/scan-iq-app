import React from "react";
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Layers,
  Info
} from "lucide-react";
import { compareProducts } from "../utils/unitPriceCalculator";
import { evaluateNutrition } from "../utils/nutritionEvaluator";

export default function ComparisonTable({ prodA, prodB, isMalayalam, t }) {
  if (!prodA || !prodB) return null;

  const comparison = compareProducts(prodA, prodB);
  const evalA = evaluateNutrition(prodA);
  const evalB = evaluateNutrition(prodB);

  const nameA = isMalayalam && prodA.nameMl ? prodA.nameMl : prodA.name;
  const nameB = isMalayalam && prodB.nameMl ? prodB.nameMl : prodB.name;

  return (
    <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden mb-12">
      {/* 1. Header: Comparison Title & Category Fairness Check */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">{t.compareNow}</h2>
              <p className="text-xs text-slate-300">
                {nameA} <span className="text-emerald-400 font-semibold">VS</span> {nameB}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">{t.dataCompleteness}</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${evalA.status === 'INCOMPLETE' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                A: {evalA.status === 'INCOMPLETE' ? t.incompleteData : t.completeData}
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${evalB.status === 'INCOMPLETE' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                B: {evalB.status === 'INCOMPLETE' ? t.incompleteData : t.completeData}
              </span>
            </div>
          </div>
        </div>

        {/* Category Matching Alert Banner (Fair Comparison Logic) */}
        {!comparison.isSameCategory ? (
          <div className="mt-4 p-3 bg-amber-900/40 border border-amber-500/40 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              {t.categoryMismatchWarning
                .replace("{cat1}", prodA.category)
                .replace("{cat2}", prodB.category)}
            </div>
          </div>
        ) : (
          <div className="mt-4 p-2.5 bg-emerald-900/30 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-xs text-emerald-200">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{t.categoryMatch.replace("{cat}", prodA.category)}</span>
          </div>
        )}
      </div>

      {/* 2. True Value Unit-Price Head-to-Head Banner */}
      <div className="bg-emerald-50/70 border-b border-emerald-100 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm sm:text-base mb-3">
          <TrendingDown className="w-5 h-5 text-emerald-600" />
          <span>{t.trueValueHeader}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product A Unit Value */}
          <div className={`p-4 rounded-2xl border transition-all ${
            comparison.betterValue === 'A'
              ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500">Product A: {nameA}</span>
              {comparison.betterValue === 'A' && (
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3 h-3" /> {t.betterValue}
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-slate-900">
              ₹{comparison.unitA} <span className="text-xs font-normal text-slate-500">/ {comparison.unitUnit}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Base: ₹{prodA.price} for {prodA.packageSize?.value}{prodA.packageSize?.unit}
            </p>
          </div>

          {/* Product B Unit Value */}
          <div className={`p-4 rounded-2xl border transition-all ${
            comparison.betterValue === 'B'
              ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/80 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-500">Product B: {nameB}</span>
              {comparison.betterValue === 'B' && (
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                  <Sparkles className="w-3 h-3" /> {t.betterValue}
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-slate-900">
              ₹{comparison.unitB} <span className="text-xs font-normal text-slate-500">/ {comparison.unitUnit}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Base: ₹{prodB.price} for {prodB.packageSize?.value}{prodB.packageSize?.unit}
            </p>
          </div>
        </div>

        {/* Savings Announcement */}
        {comparison.betterValue !== 'EQUAL' && (
          <div className="mt-3 text-center text-xs font-semibold text-emerald-800 bg-emerald-100/70 py-2 rounded-xl">
            🎉 {comparison.betterValue === 'A' ? nameA : nameB} {t.savingAlert.replace("{pct}", comparison.savingsPercent)}
          </div>
        )}
      </div>

      {/* 3. Side-by-Side Nutrition Comparison Grid */}
      <div className="p-5 sm:p-7">
        <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-600" /> {t.healthTitle}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="py-3 px-4 font-semibold w-1/3">Nutrient / Metric</th>
                <th className="py-3 px-4 font-semibold w-1/3 text-emerald-950 bg-emerald-50/50">
                  {nameA}
                </th>
                <th className="py-3 px-4 font-semibold w-1/3 text-teal-950 bg-teal-50/50">
                  {nameB}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Serving Size */}
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-600">{t.nutrients.servingSize}</td>
                <td className="py-2.5 px-4 font-semibold text-slate-800">{prodA.nutritionalInfo?.servingSize || "100g"}</td>
                <td className="py-2.5 px-4 font-semibold text-slate-800">{prodB.nutritionalInfo?.servingSize || "100g"}</td>
              </tr>
              {/* Calories */}
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-600">{t.nutrients.calories}</td>
                <td className="py-2.5 px-4 font-bold text-slate-800">
                  {prodA.nutritionalInfo?.calories ? `${prodA.nutritionalInfo.calories} kcal` : "-"}
                </td>
                <td className="py-2.5 px-4 font-bold text-slate-800">
                  {prodB.nutritionalInfo?.calories ? `${prodB.nutritionalInfo.calories} kcal` : "-"}
                </td>
              </tr>
              {/* Sugar */}
              <tr className="bg-slate-50/40">
                <td className="py-2.5 px-4 font-medium text-slate-600">{t.nutrients.sugar}</td>
                <td className={`py-2.5 px-4 font-bold ${Number(prodA.nutritionalInfo?.sugar) > 15 ? 'text-rose-600' : 'text-slate-800'}`}>
                  {prodA.nutritionalInfo?.sugar !== null ? `${prodA.nutritionalInfo.sugar}g` : <span className="text-slate-400">Not Disclosed</span>}
                </td>
                <td className={`py-2.5 px-4 font-bold ${Number(prodB.nutritionalInfo?.sugar) > 15 ? 'text-rose-600' : 'text-slate-800'}`}>
                  {prodB.nutritionalInfo?.sugar !== null ? `${prodB.nutritionalInfo.sugar}g` : <span className="text-slate-400">Not Disclosed</span>}
                </td>
              </tr>
              {/* Total Fat */}
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-600">{t.nutrients.fat}</td>
                <td className="py-2.5 px-4 text-slate-800">{prodA.nutritionalInfo?.fat !== null ? `${prodA.nutritionalInfo.fat}g` : "-"}</td>
                <td className="py-2.5 px-4 text-slate-800">{prodB.nutritionalInfo?.fat !== null ? `${prodB.nutritionalInfo.fat}g` : "-"}</td>
              </tr>
              {/* Saturated Fat */}
              <tr className="bg-slate-50/40">
                <td className="py-2.5 px-4 font-medium text-slate-600">{t.nutrients.saturatedFat}</td>
                <td className="py-2.5 px-4 text-slate-800">{prodA.nutritionalInfo?.saturatedFat !== null ? `${prodA.nutritionalInfo.saturatedFat}g` : "-"}</td>
                <td className="py-2.5 px-4 text-slate-800">{prodB.nutritionalInfo?.saturatedFat !== null ? `${prodB.nutritionalInfo.saturatedFat}g` : "-"}</td>
              </tr>
              {/* Sodium */}
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-600">{t.nutrients.sodium}</td>
                <td className={`py-2.5 px-4 font-bold ${Number(prodA.nutritionalInfo?.sodium) > 500 ? 'text-amber-600' : 'text-slate-800'}`}>
                  {prodA.nutritionalInfo?.sodium !== null ? `${prodA.nutritionalInfo.sodium}mg` : "-"}
                </td>
                <td className={`py-2.5 px-4 font-bold ${Number(prodB.nutritionalInfo?.sodium) > 500 ? 'text-amber-600' : 'text-slate-800'}`}>
                  {prodB.nutritionalInfo?.sodium !== null ? `${prodB.nutritionalInfo.sodium}mg` : "-"}
                </td>
              </tr>
              {/* Fiber */}
              <tr className="bg-slate-50/40">
                <td className="py-2.5 px-4 font-medium text-slate-600">{t.nutrients.fiber}</td>
                <td className="py-2.5 px-4 text-emerald-700 font-bold">{prodA.nutritionalInfo?.fiber !== null ? `${prodA.nutritionalInfo.fiber}g` : "-"}</td>
                <td className="py-2.5 px-4 text-emerald-700 font-bold">{prodB.nutritionalInfo?.fiber !== null ? `${prodB.nutritionalInfo.fiber}g` : "-"}</td>
              </tr>
              {/* Protein */}
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-600">{t.nutrients.protein}</td>
                <td className="py-2.5 px-4 text-slate-800">{prodA.nutritionalInfo?.protein !== null ? `${prodA.nutritionalInfo.protein}g` : "-"}</td>
                <td className="py-2.5 px-4 text-slate-800">{prodB.nutritionalInfo?.protein !== null ? `${prodB.nutritionalInfo.protein}g` : "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4. Nuanced Health Pros & Cons Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
          {/* Prod A Bullets */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm mb-2">{nameA} - Insights</h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-emerald-800 block mb-1">✓ {t.pros}:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {evalA.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-semibold text-rose-800 block mb-1">⚠ {t.cons}:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {evalA.cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Prod B Bullets */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-800 text-sm mb-2">{nameB} - Insights</h4>
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-emerald-800 block mb-1">✓ {t.pros}:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {evalB.pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-semibold text-rose-800 block mb-1">⚠ {t.cons}:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {evalB.cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Allergens Banner */}
        <div className="mt-5 p-3.5 bg-rose-50/60 border border-rose-200 rounded-xl text-xs text-rose-900 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <span className="font-bold block text-rose-800 mb-0.5">{nameA} Allergens:</span>
            {prodA.allergens && prodA.allergens.length > 0 ? (
              <span className="font-semibold">{prodA.allergens.join(", ")}</span>
            ) : (
              <span className="text-slate-500">{t.noAllergens}</span>
            )}
          </div>
          <div className="flex-1 sm:border-l sm:border-rose-200 sm:pl-3">
            <span className="font-bold block text-rose-800 mb-0.5">{nameB} Allergens:</span>
            {prodB.allergens && prodB.allergens.length > 0 ? (
              <span className="font-semibold">{prodB.allergens.join(", ")}</span>
            ) : (
              <span className="text-slate-500">{t.noAllergens}</span>
            )}
          </div>
        </div>

        {/* 6. Live Deals & Final Payable Price Breakdown */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              {t.dealsHeader}
            </h3>
            <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {t.verifiedFeed}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Deals for Prod A */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 block mb-2">{nameA} Offers:</span>
              {comparison.dealsA.map((deal, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 block">{deal.store}</span>
                    <span className="text-[11px] text-slate-500">
                      ₹{deal.basePrice} + Deliv: ₹{deal.deliveryFee} - Off: ₹{deal.discount}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{t.finalPayable}</span>
                    <span className="font-bold text-sm text-emerald-700">₹{deal.finalPayable}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Deals for Prod B */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-700 block mb-2">{nameB} Offers:</span>
              {comparison.dealsB.map((deal, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-slate-800 block">{deal.store}</span>
                    <span className="text-[11px] text-slate-500">
                      ₹{deal.basePrice} + Deliv: ₹{deal.deliveryFee} - Off: ₹{deal.discount}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{t.finalPayable}</span>
                    <span className="font-bold text-sm text-emerald-700">₹{deal.finalPayable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
