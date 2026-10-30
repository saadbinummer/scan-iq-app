import React from "react";
import { Plus, Check, AlertTriangle, ShieldCheck, ShieldAlert, Shield } from "lucide-react";
import { calculateUnitPrice } from "../utils/unitPriceCalculator";
import { evaluateNutrition } from "../utils/nutritionEvaluator";

export default function ProductCard({
  product,
  isSelectedSlot1,
  isSelectedSlot2,
  onSelectSlot1,
  onSelectSlot2,
  isMalayalam,
  t
}) {
  const unitPrice = calculateUnitPrice(product.price, product.packageSize?.value);
  const evaluation = evaluateNutrition(product);

  const displayName = isMalayalam && product.nameMl ? product.nameMl : product.name;
  const displayCategory = isMalayalam && product.categoryMl ? product.categoryMl : product.category;

  // Status Badge Colors & Icons
  const getBadgeDetails = () => {
    if (evaluation.status === "INCOMPLETE") {
      return {
        bg: "bg-slate-100 text-slate-800 border-slate-300",
        icon: <AlertTriangle className="w-3.5 h-3.5 text-slate-500" />,
        label: t.healthStatus.INCOMPLETE
      };
    }
    if (evaluation.status === "HEALTHY") {
      return {
        bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
        icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
        label: t.healthStatus.HEALTHY
      };
    }
    if (evaluation.status === "MODERATE") {
      return {
        bg: "bg-amber-50 text-amber-800 border-amber-200",
        icon: <Shield className="w-3.5 h-3.5 text-amber-600" />,
        label: t.healthStatus.MODERATE
      };
    }
    return {
      bg: "bg-rose-50 text-rose-800 border-rose-200",
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />,
      label: t.healthStatus.UNHEALTHY
    };
  };

  const badge = getBadgeDetails();

  return (
    <div className="bg-white rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 border border-slate-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Image Header with Price & Unit Price Tag */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={displayName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
            ₹{product.price}
          </div>
          <div className="absolute bottom-2.5 left-2.5 bg-emerald-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
            {t.unitPrice}: ₹{unitPrice} / {product.packageSize?.unit === "ml" ? "100ml" : "100g"}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-slate-600 uppercase">
              {product.brand} • {displayCategory}
            </span>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 mt-0.5">
              {displayName}
            </h3>
            <span className="text-xs text-slate-500">
              Net: {product.packageSize?.value}{product.packageSize?.unit}
            </span>
          </div>

          {/* Nuanced Health Badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${badge.bg}`}>
            {badge.icon}
            <span className="line-clamp-1">{badge.label}</span>
          </div>

          {/* Incomplete Data warning note if applicable */}
          {evaluation.status === "INCOMPLETE" && (
            <div className="text-[11px] text-amber-700 bg-amber-50/70 p-2 rounded-lg border border-amber-200/80">
              {t.incompleteWarning}
            </div>
          )}

          {/* Quick Nutrient Highlights (Sugar, Saturated Fat, Sodium, Fiber) */}
          <div className="grid grid-cols-4 gap-1.5 py-2 border-t border-b border-slate-100 text-center text-[10px]">
            <div className="bg-slate-50 p-1 rounded-md">
              <span className="text-slate-400 block">{t.nutrients.sugar}</span>
              <span className="font-bold text-slate-700">
                {product.nutritionalInfo?.sugar !== null && product.nutritionalInfo?.sugar !== undefined
                  ? `${product.nutritionalInfo.sugar}g`
                  : "-"}
              </span>
            </div>
            <div className="bg-slate-50 p-1 rounded-md">
              <span className="text-slate-400 block">{t.nutrients.saturatedFat}</span>
              <span className="font-bold text-slate-700">
                {product.nutritionalInfo?.saturatedFat !== null && product.nutritionalInfo?.saturatedFat !== undefined
                  ? `${product.nutritionalInfo.saturatedFat}g`
                  : "-"}
              </span>
            </div>
            <div className="bg-slate-50 p-1 rounded-md">
              <span className="text-slate-400 block">{t.nutrients.sodium}</span>
              <span className="font-bold text-slate-700">
                {product.nutritionalInfo?.sodium !== null && product.nutritionalInfo?.sodium !== undefined
                  ? `${product.nutritionalInfo.sodium}mg`
                  : "-"}
              </span>
            </div>
            <div className="bg-slate-50 p-1 rounded-md">
              <span className="text-slate-400 block">{t.nutrients.fiber}</span>
              <span className="font-bold text-slate-700">
                {product.nutritionalInfo?.fiber !== null && product.nutritionalInfo?.fiber !== undefined
                  ? `${product.nutritionalInfo.fiber}g`
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons (Slot 1 & Slot 2) */}
      <div className="p-3 bg-slate-50/80 border-t border-slate-100 grid grid-cols-2 gap-2">
        <button
          onClick={onSelectSlot1}
          className={`py-2 px-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1 ${
            isSelectedSlot1
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200"
          }`}
        >
          {isSelectedSlot1 ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span className="truncate">Slot 1</span>
        </button>

        <button
          onClick={onSelectSlot2}
          className={`py-2 px-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1 ${
            isSelectedSlot2
              ? "bg-teal-600 text-white shadow-xs"
              : "bg-white hover:bg-teal-50 text-slate-700 border border-slate-200"
          }`}
        >
          {isSelectedSlot2 ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span className="truncate">Slot 2</span>
        </button>
      </div>
    </div>
  );
}
