import React from "react";
import {
  ArrowLeft,
  ShieldCheck,
  ShieldAlert,
  Shield,
  AlertTriangle,
  Flame,
  Dna,
  Wheat,
  ExternalLink,
  Scale,
  Sparkles,
  Cpu,
  Smartphone,
  HardDrive,
  BatteryCharging,
  Layers,
  Star,
  CheckCircle2,
  Tag
} from "lucide-react";
import { evaluateNutrition } from "../../utils/nutritionEvaluator";
import { isFoodProduct } from "../../utils/unitPriceCalculator";

export default function ProductDetailScreen({
  product,
  onBack,
  onSetSlot1,
  onSetSlot2,
  onOpenHealthInspector,
  onOpenCalorieCalculator,
  isMalayalam,
  t
}) {
  if (!product) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-500">{t.common.notAvailable}</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
        >
          {t.productDetail.backBtn}
        </button>
      </div>
    );
  }

  const isFood = isFoodProduct(product);
  const evaluation = isFood ? evaluateNutrition(product) : null;
  const displayName = isMalayalam && product.nameMl ? product.nameMl : product.name;
  const displayCategory = isMalayalam && product.categoryMl ? product.categoryMl : product.category;

  // Best payable price
  const deals = product.deals || [];
  const minPayable = deals.length > 0
    ? Math.min(...deals.map(d => d.finalPayable !== undefined ? d.finalPayable : d.price))
    : product.price;

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn max-w-5xl mx-auto">
      {/* 1. Top Bar with Back Button & Comparison Shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.productDetail.backBtn}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSetSlot1(product)}
            className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Compare as Product 1"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{t.productDetail.addToCompareSlot1}</span>
          </button>
          <button
            onClick={() => onSetSlot2(product)}
            className="px-3 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Compare as Product 2"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{t.productDetail.addToCompareSlot2}</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Image */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group w-48 h-48 sm:w-56 sm:h-56 bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center p-2">
              <img
                src={product.imageUrl}
                alt={displayName}
                className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                isFood ? "bg-emerald-500/90 text-white" : "bg-sky-500/90 text-white"
              }`}>
                {isFood ? t.scanScreen.foodBadge : t.scanScreen.electronicsBadge}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-amber-300 border border-slate-700">
                {product.brand}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {displayCategory}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800">
                UPC: {product.barcode}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
              {displayName}
            </h1>

            {/* Ratings & Warranty (if tech) */}
            {product.ratings && (
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.ratings.average} / 5.0</span>
                <span className="text-slate-400 font-normal">({product.ratings.count.toLocaleString()} verified buyers)</span>
              </div>
            )}
            {product.warranty && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{product.warranty}</span>
              </p>
            )}

            {/* Pricing Summary */}
            <div className="pt-2 flex flex-wrap items-baseline gap-3">
              <div>
                <span className="text-xs text-slate-400 block">{t.productDetail.bestPrice}</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  ₹{minPayable.toLocaleString()}
                </span>
              </div>
              {product.mrp && product.mrp > minPayable && (
                <div>
                  <span className="text-xs text-slate-400 block">{t.productDetail.mrp}</span>
                  <span className="text-lg line-through text-slate-500 font-semibold">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                </div>
              )}
              {product.mrp && product.mrp > minPayable && (
                <span className="px-2 py-1 rounded-md text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Save ₹{(product.mrp - minPayable).toLocaleString()} ({Math.round(((product.mrp - minPayable) / product.mrp) * 100)}% OFF)
                </span>
              )}
            </div>

            {/* Data Source Footnote */}
            <p className="text-[11px] text-slate-400 pt-1">
              {t.productDetail.dataSource}: <span className="text-slate-300 font-semibold">{product.dataSource || "ScanIQ Verified Hub"}</span>
            </p>
          </div>

        </div>
      </div>

      {/* 3. CONDITIONAL BODY: FOOD HEALTH INSPECTOR vs ELECTRONICS SPECS */}
      {isFood ? (
        /* ================== FOOD NUTRITION PANEL ================== */
        <div className="space-y-6">
          {/* Health Verdict Badge */}
          {evaluation && (
            <div className={`p-5 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              evaluation.verdict === "HEALTHY"
                ? "bg-emerald-50/90 border-emerald-200 text-emerald-950"
                : evaluation.verdict === "CAUTION"
                ? "bg-rose-50/90 border-rose-200 text-rose-950"
                : "bg-amber-50/90 border-amber-200 text-amber-950"
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-2xl ${
                  evaluation.verdict === "HEALTHY"
                    ? "bg-emerald-500 text-white"
                    : evaluation.verdict === "CAUTION"
                    ? "bg-rose-500 text-white"
                    : "bg-amber-500 text-white"
                }`}>
                  {evaluation.verdict === "HEALTHY" ? (
                    <ShieldCheck className="w-6 h-6" />
                  ) : evaluation.verdict === "CAUTION" ? (
                    <ShieldAlert className="w-6 h-6" />
                  ) : (
                    <Shield className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg">
                    {evaluation.label}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 opacity-90 max-w-2xl">
                    {evaluation.details}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {onOpenCalorieCalculator && (
                  <button
                    onClick={() => onOpenCalorieCalculator(product)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold hover:from-amber-600 hover:to-orange-700 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5 text-white fill-white" />
                    <span>{t.productDetail.openInCalorieCalculator || "🔥 Check Calories"}</span>
                  </button>
                )}

                {onOpenHealthInspector && (
                  <button
                    onClick={() => onOpenHealthInspector(product)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t.productDetail.openInHealthInspector}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Incomplete Data Banner */}
          {product.isDataIncomplete && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs sm:text-sm">{t.healthInspector.incompleteData}</h4>
                <p className="text-xs mt-1 text-amber-800">{t.healthInspector.incompleteExplanation}</p>
              </div>
            </div>
          )}

          {/* Nutritional Breakdown Cards */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {t.productDetail.nutritionTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  {t.healthInspector.servingSizeInfo}: <span className="font-bold text-slate-700">{product.nutritionalInfo?.servingSize || "100g"}</span> | {t.healthInspector.per100g}
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                {product.packageSize?.value} {product.packageSize?.unit} Pack
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* Calories */}
              <div
                onClick={() => onOpenCalorieCalculator && onOpenCalorieCalculator(product)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  onOpenCalorieCalculator
                    ? "bg-amber-50/70 border-amber-200 hover:border-amber-400 hover:shadow-xs cursor-pointer group"
                    : "bg-slate-50 border-slate-100"
                }`}
                title="Click to calculate custom portion calories"
              >
                <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-500 uppercase font-bold block">{t.healthInspector.caloriesInfo}</span>
                <span className="text-base font-black text-slate-800">
                  {product.nutritionalInfo?.calories ?? "N/A"}
                </span>
                <span className="text-[10px] text-amber-600 font-bold block">kcal • Portions →</span>
              </div>

              {/* Protein */}
              <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 text-center">
                <Dna className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">{t.healthInspector.proteinMeter}</span>
                <span className="text-base font-black text-emerald-900">
                  {product.nutritionalInfo?.protein !== null && product.nutritionalInfo?.protein !== undefined ? `${product.nutritionalInfo.protein}g` : "N/A"}
                </span>
                <span className="text-[10px] text-emerald-600 block">per 100g</span>
              </div>

              {/* Fiber */}
              <div className="bg-teal-50/60 p-3 rounded-2xl border border-teal-100 text-center">
                <Wheat className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <span className="text-[10px] text-teal-800 uppercase font-bold block">{t.healthInspector.fiberMeter}</span>
                <span className="text-base font-black text-teal-900">
                  {product.nutritionalInfo?.fiber !== null && product.nutritionalInfo?.fiber !== undefined ? `${product.nutritionalInfo.fiber}g` : "N/A"}
                </span>
                <span className="text-[10px] text-teal-600 block">per 100g</span>
              </div>

              {/* Sugar */}
              <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-100 text-center">
                <span className="text-[10px] text-amber-800 uppercase font-bold block">{t.healthInspector.sugarMeter}</span>
                <span className="text-base font-black text-amber-900">
                  {product.nutritionalInfo?.sugar !== null && product.nutritionalInfo?.sugar !== undefined ? `${product.nutritionalInfo.sugar}g` : "N/A"}
                </span>
                <span className="text-[10px] text-amber-600 block">per 100g</span>
              </div>

              {/* Saturated Fat */}
              <div className="bg-rose-50/60 p-3 rounded-2xl border border-rose-100 text-center">
                <span className="text-[10px] text-rose-800 uppercase font-bold block">{t.healthInspector.fatMeter}</span>
                <span className="text-base font-black text-rose-900">
                  {product.nutritionalInfo?.saturatedFat !== null && product.nutritionalInfo?.saturatedFat !== undefined ? `${product.nutritionalInfo.saturatedFat}g` : "N/A"}
                </span>
                <span className="text-[10px] text-rose-600 block">per 100g</span>
              </div>

              {/* Sodium */}
              <div className="bg-sky-50/60 p-3 rounded-2xl border border-sky-100 text-center">
                <span className="text-[10px] text-sky-800 uppercase font-bold block">{t.healthInspector.sodiumMeter}</span>
                <span className="text-base font-black text-sky-900">
                  {product.nutritionalInfo?.sodium !== null && product.nutritionalInfo?.sodium !== undefined ? `${product.nutritionalInfo.sodium}mg` : "N/A"}
                </span>
                <span className="text-[10px] text-sky-600 block">per 100g</span>
              </div>
            </div>

            {/* Ingredients & Allergens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    {t.healthInspector.ingredientsList}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {product.ingredients.join(", ")}
                  </p>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  {t.healthInspector.allergensDetected}
                </h4>
                {product.allergens && product.allergens.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {product.allergens.map((allergen, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200"
                      >
                        ⚠️ {allergen}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-emerald-700 font-medium">
                    {t.healthInspector.noAllergens}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================== ELECTRONICS / SPECS PANEL ================== */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Cpu className="w-5 h-5 text-sky-600" />
              <span>{t.productDetail.specsTitle}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Verified hardware and technical specifications
            </p>
          </div>

          {product.specs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start justify-between gap-3"
                >
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {key.replace(/_/g, " ")}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-900 text-right">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Detailed specifications available in product catalog.</p>
          )}
        </div>
      )}

      {/* 4. MULTI-STORE PRICE COMPARISON TABLE (All Products) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-black text-slate-900 text-base">
              {t.productDetail.dealsTitle}
            </h3>
            <p className="text-xs text-slate-500">
              {t.dealsHub.subtitle}
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {deals.length} Stores Tracked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal, idx) => {
            const isLowest = (deal.finalPayable !== undefined ? deal.finalPayable : deal.price) === minPayable;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isLowest
                    ? "bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-400/40 shadow-md"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-extrabold text-sm text-slate-900">
                      {deal.store || deal.platform}
                    </span>
                    {isLowest && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white shadow-xs">
                        {t.dealsHub.bestValueStore}
                      </span>
                    )}
                  </div>

                  {/* Transparency Badge */}
                  <div className="mb-3">
                    {deal.dataType === "LIVE_API_FEED" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        {t.dealsHub.liveApiBadge}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-md">
                        {t.dealsHub.catalogMrpBadge}
                      </span>
                    )}
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-1 text-xs text-slate-600 mb-4">
                    <div className="flex justify-between">
                      <span>{t.dealsHub.basePrice}:</span>
                      <span className="font-semibold">₹{deal.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.dealsHub.deliveryFee}:</span>
                      <span>{deal.delivery === 0 ? "FREE" : `₹${deal.delivery}`}</span>
                    </div>
                    {deal.discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>{t.dealsHub.discount}:</span>
                        <span>-₹{deal.discount} {deal.coupon && `(${deal.coupon})`}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t.dealsHub.finalPayable}</span>
                    <span className="text-lg font-black text-slate-900">
                      ₹{(deal.finalPayable !== undefined ? deal.finalPayable : deal.price).toLocaleString()}
                    </span>
                  </div>
                  <a
                    href={deal.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>Store</span>
                    <ExternalLink className="w-3 h-3 text-slate-300" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 pt-2 text-center">
          {t.dealsHub.priceDisclaimer}
        </p>
      </div>

    </div>
  );
}
