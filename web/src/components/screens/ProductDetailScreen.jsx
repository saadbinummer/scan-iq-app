import React, { useState, useEffect } from "react";
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
  Tag,
  Heart,
  ChefHat,
  Clock,
  ArrowRight,
  TrendingUp,
  Sliders,
  AlertOctagon,
  HelpCircle
} from "lucide-react";
import { evaluateNutrition } from "../../utils/nutritionEvaluator";
import { isFoodProduct } from "../../utils/unitPriceCalculator";
import {
  isFavorite,
  toggleFavorite,
  checkUserAllergenConflict,
  addToScanHistory
} from "../../services/authService";
import { sampleFoodProducts } from "../../data/sampleProducts";

export default function ProductDetailScreen({
  product,
  onBack,
  onSetSlot1,
  onSetSlot2,
  onOpenHealthInspector,
  onOpenCalorieCalculator,
  onSelectAlternative,
  isMalayalam,
  t
}) {
  const [isFav, setIsFav] = useState(false);
  const [allergenConflicts, setAllergenConflicts] = useState([]);

  useEffect(() => {
    if (product) {
      setIsFav(isFavorite(product.barcode));
      setAllergenConflicts(checkUserAllergenConflict(product));
      addToScanHistory(product);
    }
  }, [product]);

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
  const evaluation = isFood ? evaluateNutrition(product, isMalayalam ? "ml" : "en") : null;
  const displayName = isMalayalam && product.nameMl ? product.nameMl : product.name;
  const displayCategory = isMalayalam && product.categoryMl ? product.categoryMl : product.category;

  // Best payable price
  const deals = product.deals || [];
  const minPayable = deals.length > 0
    ? Math.min(...deals.map(d => d.finalPayable !== undefined ? d.finalPayable : d.price))
    : product.price;

  const handleToggleFav = () => {
    const newState = toggleFavorite(product);
    setIsFav(newState);
  };

  // Find alternative products from sample catalog if barcodes exist
  const healthierAltProduct = product.healthierAlternative?.barcode
    ? sampleFoodProducts.find(p => p.barcode === product.healthierAlternative.barcode)
    : null;

  const economyAltProduct = product.economyAlternative?.barcode
    ? sampleFoodProducts.find(p => p.barcode === product.economyAlternative.barcode)
    : null;

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn max-w-5xl mx-auto">
      {/* 1. Top Bar with Back, Compare, and Favorite Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.productDetail.backBtn}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Favorite Button */}
          <button
            onClick={handleToggleFav}
            className={`px-3 py-2 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isFav
                ? "bg-amber-50 text-amber-600 border-amber-300"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFav ? "fill-amber-400 text-amber-400" : "text-slate-400"}`} />
            <span>{isFav ? (isMalayalam ? "ഫേവറിറ്റ്" : "Favorited") : (isMalayalam ? "ഫേവറിറ്റ് ആക്കുക" : "Favorite")}</span>
          </button>

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

      {/* 2. PERSONAL ALLERGY CONFLICT BANNER (If triggered by user dietary settings) */}
      {allergenConflicts.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-rose-950/90 border-2 border-rose-500 text-rose-100 shadow-xl animate-shake">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-500 text-white rounded-2xl shrink-0 shadow-lg">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-rose-500/30 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-500/40">
                  CRITICAL PERSONAL DIETARY ALERT
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">
                {isMalayalam ? "നിങ്ങളുടെ അലർജി പ്രൊഫൈലുമായി ചേരുന്നില്ല!" : "Personal Allergy Conflict Detected!"}
              </h3>
              <div className="mt-2 space-y-1">
                {allergenConflicts.map((c, i) => (
                  <p key={i} className="text-xs text-rose-200 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span className="font-bold text-white">{isMalayalam ? c.titleMl : c.title}:</span>
                    <span>{c.message}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 1-SENTENCE HEALTH VERDICT & SPECIFIC REASON BANNER (User Request Highlight) */}
      {isFood && evaluation && (
        <div
          className={`p-5 rounded-3xl border-2 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
            evaluation.status === "HEALTHY"
              ? "bg-gradient-to-r from-emerald-950/90 to-slate-900 border-emerald-500/70 text-emerald-100"
              : evaluation.status === "CAUTION"
              ? "bg-gradient-to-r from-rose-950/90 to-slate-900 border-rose-500/70 text-rose-100"
              : "bg-gradient-to-r from-amber-950/90 to-slate-900 border-amber-500/70 text-amber-100"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`p-3 rounded-2xl shrink-0 shadow-md ${
                evaluation.status === "HEALTHY"
                  ? "bg-emerald-500 text-slate-950"
                  : evaluation.status === "CAUTION"
                  ? "bg-rose-500 text-white"
                  : "bg-amber-400 text-slate-950"
              }`}
            >
              {evaluation.status === "HEALTHY" ? (
                <ShieldCheck className="w-7 h-7 stroke-[2.5]" />
              ) : evaluation.status === "CAUTION" ? (
                <ShieldAlert className="w-7 h-7 stroke-[2.5]" />
              ) : (
                <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    evaluation.status === "HEALTHY"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : evaluation.status === "CAUTION"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  }`}
                >
                  {evaluation.singleSentenceVerdict.title}
                </span>

                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  Nutri-Grade: <strong className="text-white">{evaluation.grade}</strong> (Score {evaluation.score}/100)
                </span>
              </div>

              {/* The One Sentence Verdict and Reason */}
              <p className="text-xs sm:text-sm font-bold text-white mt-1.5 leading-snug">
                {evaluation.singleSentenceVerdict.fullText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={() => onOpenCalorieCalculator(product)}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Calorie IQ</span>
            </button>
            <button
              onClick={() => onOpenHealthInspector(product)}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl transition-all shadow-md cursor-pointer"
            >
              Full Inspector
            </button>
          </div>
        </div>
      )}

      {/* 4. HERO PRODUCT HEADER CARD */}
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

            <p className="text-[11px] text-slate-400 pt-1">
              {t.productDetail.dataSource}: <span className="text-slate-300 font-semibold">{product.dataSource || "NutriVerse Verified Hub"}</span>
            </p>
          </div>

        </div>
      </div>

      {/* 5. CLINICAL HEALTH RISKS & MEDICAL WARNINGS SECTION */}
      {isFood && evaluation && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isMalayalam ? "ആരോഗ്യ മുന്നറിയിപ്പുകളും സാധ്യമായ രോഗ സാധ്യതകളും" : "Clinical Health Risks & Disease Warnings"}
                </h3>
                <p className="text-xs text-slate-500">
                  {isMalayalam
                    ? "അമിതമായി ഉപയോഗിച്ചാൽ വരാൻ സാധ്യതയുള്ള രോഗങ്ങളും ആരോഗ്യ പ്രത്യാഘാതങ്ങളും."
                    : "Evidence-based health projections if consumed frequently beyond recommended limits."}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
              WHO / FSSAI Guidelines
            </span>
          </div>

          {evaluation.healthRisks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {evaluation.healthRisks.map((risk, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-rose-300 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span>{risk.condition}</span>
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                        risk.severity === "HIGH" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {risk.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isMalayalam ? "പ്രത്യേക ഗുരുതരമായ രോഗസാധ്യതകളോ അമിത ഘടകങ്ങളോ ഇതിൽ കണ്ടെത്തിയിട്ടില്ല." : "No critical health or disease risks detected under typical serving thresholds."}</span>
            </div>
          )}

          {/* ALLERGEN BREAKDOWN */}
          {evaluation.allergyRisks.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5 text-purple-600" />
                <span>{isMalayalam ? "അലർജി അലേർട്ടുകളും ലക്ഷണങ്ങളും" : "Allergen Alerts & Specific Symptoms"}</span>
              </span>

              <div className="space-y-2">
                {evaluation.allergyRisks.map((allrg, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-purple-50/60 border border-purple-200/80 flex items-start gap-2.5 text-xs text-slate-700"
                  >
                    <span className="px-2 py-0.5 rounded-md font-bold bg-purple-200 text-purple-900 shrink-0 text-[11px]">
                      {isMalayalam ? allrg.allergenMl : allrg.allergen}
                    </span>
                    <span className="leading-snug">{allrg.symptoms}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. NUTRITIONAL MACRONUTRIENT BREAKDOWN TILES */}
      {isFood && evaluation && !evaluation.isDataIncomplete && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>{t.productDetail.nutritionFacts}</span>
            </h3>
            <span className="text-xs text-slate-500">
              Serving: <strong>{evaluation.servingGrams}g/ml</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Calories */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-center">
              <span className="text-[10px] font-bold text-amber-700 block uppercase">Calories</span>
              <span className="text-xl font-black text-amber-950 mt-1 block">
                {product.nutritionalInfo.calories} <small className="text-xs font-normal">kcal</small>
              </span>
              <span className="text-[10px] text-amber-700 font-medium">
                {evaluation.perServing.calories} kcal / svg
              </span>
            </div>

            {/* Protein */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-center">
              <span className="text-[10px] font-bold text-indigo-700 block uppercase">Protein</span>
              <span className="text-xl font-black text-indigo-950 mt-1 block">
                {product.nutritionalInfo.protein ?? "—"} <small className="text-xs font-normal">g</small>
              </span>
              <span className="text-[10px] text-indigo-700 font-medium">
                {evaluation.perServing.protein}g / svg
              </span>
            </div>

            {/* Sugar */}
            <div className={`p-3.5 rounded-2xl border text-center ${
              (product.nutritionalInfo.sugar || 0) > 15 ? "bg-rose-50/80 border-rose-200 text-rose-950" : "bg-emerald-50/80 border-emerald-200 text-emerald-950"
            }`}>
              <span className="text-[10px] font-bold block uppercase">Sugar</span>
              <span className="text-xl font-black mt-1 block">
                {product.nutritionalInfo.sugar ?? "—"} <small className="text-xs font-normal">g</small>
              </span>
              <span className="text-[10px] font-medium">
                {evaluation.perServing.sugar}g / svg
              </span>
            </div>

            {/* Total Fat */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-600 block uppercase">Total Fat</span>
              <span className="text-xl font-black text-slate-900 mt-1 block">
                {product.nutritionalInfo.fat ?? "—"} <small className="text-xs font-normal">g</small>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {product.nutritionalInfo.saturatedFat ? `${product.nutritionalInfo.saturatedFat}g sat` : "—"}
              </span>
            </div>

            {/* Sodium */}
            <div className={`p-3.5 rounded-2xl border text-center ${
              (product.nutritionalInfo.sodium || 0) > 600 ? "bg-rose-50/80 border-rose-200 text-rose-950" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}>
              <span className="text-[10px] font-bold block uppercase">Sodium</span>
              <span className="text-xl font-black mt-1 block">
                {product.nutritionalInfo.sodium ?? "—"} <small className="text-xs font-normal">mg</small>
              </span>
              <span className="text-[10px] font-medium">
                {evaluation.perServing.sodium}mg / svg
              </span>
            </div>

            {/* Fiber */}
            <div className="p-3.5 rounded-2xl bg-teal-50/80 border border-teal-200 text-center">
              <span className="text-[10px] font-bold text-teal-700 block uppercase">Fiber</span>
              <span className="text-xl font-black text-teal-950 mt-1 block">
                {product.nutritionalInfo.fiber ?? "—"} <small className="text-xs font-normal">g</small>
              </span>
              <span className="text-[10px] text-teal-700 font-medium">
                {evaluation.perServing.fiber}g / svg
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 7. EXPANDED 8-PLATFORM PRICE COMPARISON TABLE (User Request) */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>{isMalayalam ? "8 ഓൺലൈൻ പ്ലാറ്റ്‌ഫോം ലൈവ് പ്രൈസ് കമ്പാരിസൺ" : "Live Price Comparison Across 8 Major Stores"}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {isMalayalam
                ? "ഡെലിവറി ചാർജും കൂപ്പൺ ഡിസ്കൗണ്ടും ഉൾപ്പെടെ നിങ്ങൾ നൽകേണ്ട യഥാർത്ഥ നെറ്റ് തുക (Final Payable)."
                : "Real-time pricing matrix including platform delivery charges, coupons, and net payable cost."}
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
            ✓ Best Price: ₹{minPayable}
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3.5 rounded-l-xl">Platform / Store</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Delivery</th>
                <th className="py-3 px-3">Coupon / Discount</th>
                <th className="py-3 px-3 font-extrabold text-slate-900">Final Payable</th>
                <th className="py-3 px-3.5 rounded-r-xl text-right">Store Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deals.map((deal, idx) => {
                const payable = deal.finalPayable !== undefined ? deal.finalPayable : deal.price;
                const isBestDeal = payable === minPayable;

                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isBestDeal ? "bg-emerald-50/50 font-semibold" : ""
                    }`}
                  >
                    <td className="py-3 px-3.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-bold text-slate-900">{deal.store}</span>
                      {deal.eta && (
                        <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">
                          ({deal.eta})
                        </span>
                      )}
                      {isBestDeal && (
                        <span className="text-[9px] font-black uppercase bg-emerald-600 text-white px-1.5 py-0.2 rounded-sm ml-1">
                          BEST
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800">
                      ₹{deal.price}
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {deal.delivery === 0 ? (
                        <span className="text-emerald-600 font-bold">FREE</span>
                      ) : (
                        `+₹${deal.delivery}`
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {deal.discount > 0 ? (
                        <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-bold text-[10px]">
                          -₹{deal.discount} {deal.coupon ? `(${deal.coupon})` : ""}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-sm font-black ${isBestDeal ? "text-emerald-600" : "text-slate-900"}`}>
                        ₹{payable}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-right">
                      {deal.url && deal.url !== "#" ? (
                        <a
                          href={deal.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400">Offline Counter</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. HEALTHIER & CHEAPER ECONOMY ALTERNATIVES CAROUSEL */}
      {isFood && (healthierAltProduct || economyAltProduct) && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{isMalayalam ? "സ്മാർട്ട് ബദലുകൾ (Healthier & Cheaper Alternatives)" : "Smart Alternatives & Better Choices"}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {isMalayalam
                ? "കൂടുതൽ ആരോഗ്യകരമായ അല്ലെങ്കിൽ വില കുറഞ്ഞ മറ്റ് ഉൽപ്പന്നങ്ങൾ."
                : "Nutritionally superior or more budget-friendly alternatives to consider."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Healthier Alternative Card */}
            {healthierAltProduct && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md">
                      🌿 Healthier Alternative
                    </span>
                    <span className="text-xs font-black text-emerald-700">₹{healthierAltProduct.price}</span>
                  </div>

                  <div className="flex items-center gap-3 my-2">
                    <img
                      src={healthierAltProduct.imageUrl}
                      alt={healthierAltProduct.name}
                      className="w-14 h-14 rounded-xl object-contain bg-white p-1 border border-emerald-200 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {isMalayalam && healthierAltProduct.nameMl ? healthierAltProduct.nameMl : healthierAltProduct.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{healthierAltProduct.brand}</p>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-900 mt-2 bg-white/70 p-2.5 rounded-xl border border-emerald-100">
                    <strong>Why it's better:</strong> {product.healthierAlternative?.reason}
                  </p>
                </div>

                <button
                  onClick={() => onSelectAlternative && onSelectAlternative(healthierAltProduct)}
                  className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Healthier Option</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Economy Alternative Card */}
            {economyAltProduct && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                      💰 Cheaper Economy Alternative
                    </span>
                    <span className="text-xs font-black text-amber-800">₹{economyAltProduct.price}</span>
                  </div>

                  <div className="flex items-center gap-3 my-2">
                    <img
                      src={economyAltProduct.imageUrl}
                      alt={economyAltProduct.name}
                      className="w-14 h-14 rounded-xl object-contain bg-white p-1 border border-amber-200 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {isMalayalam && economyAltProduct.nameMl ? economyAltProduct.nameMl : economyAltProduct.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{economyAltProduct.brand}</p>
                    </div>
                  </div>

                  <p className="text-xs text-amber-950 mt-2 bg-white/70 p-2.5 rounded-xl border border-amber-100">
                    <strong>Why it saves:</strong> {product.economyAlternative?.reason}
                  </p>
                </div>

                <button
                  onClick={() => onSelectAlternative && onSelectAlternative(economyAltProduct)}
                  className="mt-3 w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Budget Option</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. HEALTHY RECIPES & CONSUMER USAGE TIPS */}
      {isFood && product.recipes && product.recipes.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-emerald-600" />
              <span>{isMalayalam ? "ആരോഗ്യകരമായ റെസിപ്പികളും കിച്ചൺ ടിപ്സുകളും" : "Healthy Recipes & Consumer Usage Ideas"}</span>
            </h3>
            <span className="text-xs text-slate-500">Quick Homemade Hacks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {product.recipes.map((rec, rIdx) => (
              <div
                key={rIdx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {isMalayalam && rec.titleMl ? rec.titleMl : rec.title}
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{rec.time}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. INGREDIENTS LIST */}
      {isFood && product.ingredients && product.ingredients.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm space-y-3">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Wheat className="w-5 h-5 text-amber-600" />
            <span>{t.productDetail.ingredients}</span>
          </h3>

          <div className="flex flex-wrap gap-2 pt-1">
            {product.ingredients.map((ing, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
