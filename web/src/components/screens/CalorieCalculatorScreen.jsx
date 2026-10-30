import React, { useState, useEffect } from "react";
import {
  Flame,
  Scale,
  Sparkles,
  Zap,
  Activity,
  Footprints,
  Bike,
  Waves,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sliders,
  ChevronRight,
  Info,
  Smartphone,
  Cpu
} from "lucide-react";
import { evaluateProductCalories } from "../../utils/calorieCalculator";
import { isFoodProduct } from "../../utils/unitPriceCalculator";

export default function CalorieCalculatorScreen({
  activeProduct,
  productsList,
  onSelectProduct,
  onOpenScanner,
  isMalayalam,
  t
}) {
  const foodProducts = (productsList || []).filter(p => isFoodProduct(p));
  const currentProduct = activeProduct || foodProducts[0] || null;

  // Portion size in grams or ml
  const initialPortion = currentProduct?.packageSize?.value
    ? Math.min(100, currentProduct.packageSize.value)
    : 100;
  const [portionSize, setPortionSize] = useState(initialPortion);

  // Update portion size when product changes
  useEffect(() => {
    if (currentProduct) {
      const defaultServing = parseFloat(currentProduct.nutritionalInfo?.servingSize) || 100;
      setPortionSize(defaultServing);
    }
  }, [currentProduct?.id]);

  const calorieData = evaluateProductCalories(currentProduct, portionSize);
  const displayName = isMalayalam && currentProduct?.nameMl ? currentProduct.nameMl : currentProduct?.name;
  const displayCategory = isMalayalam && currentProduct?.categoryMl ? currentProduct.categoryMl : currentProduct?.category;

  const quickPortionChips = [
    { label: "25g", value: 25 },
    { label: "50g", value: 50 },
    { label: "100g", value: 100 },
    { label: "150g", value: 150 },
    { label: "200g", value: 200 },
    ...(currentProduct?.packageSize?.value && ![25, 50, 100, 150, 200].includes(currentProduct.packageSize.value)
      ? [{ label: `Full Pack (${currentProduct.packageSize.value}${currentProduct.packageSize.unit})`, value: currentProduct.packageSize.value }]
      : [])
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn max-w-5xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
            <span>{t.calorieScreen?.badge || "Calorie IQ & Energy Expenditure"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.calorieScreen?.title || "Instant Calorie & Portion Calculator"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.calorieScreen?.subtitle || "Measure exact calories for any custom portion size and see real exercise burn-off equivalents."}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {currentProduct && (
        <div className="space-y-6">
          {/* 2. Product Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentProduct.imageUrl}
                alt={displayName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain bg-white border border-slate-200 p-1 shrink-0"
              />
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                  {currentProduct.brand} • {displayCategory}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {displayName}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  {calorieData.isFood ? (
                    <span>
                      Standard: <strong className="text-slate-800">{calorieData.caloriesPer100g ?? "N/A"} kcal</strong> per 100{calorieData.servingUnit}
                    </span>
                  ) : (
                    <span className="text-sky-600 font-semibold flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5" /> Tech Hardware Device
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenScanner}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.scanBtn || "Scan Another Barcode"}</span>
            </button>
          </div>

          {/* 3. NON-FOOD TECH HARDWARE CARD */}
          {!calorieData.isFood ? (
            <div className="bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-sky-500 text-white rounded-2xl shadow-sm shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-200 text-sky-800 border border-sky-300">
                    Non-Edible Product
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    0 Dietary Calories (0 kcal)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {isMalayalam ? calorieData.techMessageMl : calorieData.techMessage}
                  </p>
                </div>
              </div>

              {/* Tech Battery Energy Comparison */}
              <div className="bg-white p-4 rounded-2xl border border-sky-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Battery Energy Storage:</span>
                </div>
                <span className="text-sm font-black text-sky-700">
                  {calorieData.techEnergy}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-xs font-bold text-slate-600 block mb-2">
                  Select a food or grocery item below to calculate dietary calories:
                </span>
                <div className="flex flex-wrap gap-2">
                  {foodProducts.slice(0, 4).map((food) => (
                    <button
                      key={food.id}
                      onClick={() => onSelectProduct(food)}
                      className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                    >
                      🥣 {isMalayalam && food.nameMl ? food.nameMl : food.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* 4. FOOD CALORIE & PORTION ENGINE */
            <div className="space-y-6">
              {/* Interactive Portion Controller Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-amber-500" />
                      <span>{t.calorieScreen?.portionTitle || "Adjust Serving / Portion Size"}</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Move slider or click a preset to see real-time calorie math
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-500">Portion:</span>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={portionSize}
                      onChange={(e) => setPortionSize(Math.max(1, Number(e.target.value) || 1))}
                      className="w-16 bg-white px-2 py-1 rounded-lg text-sm font-black text-slate-900 text-center border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-xs font-bold text-slate-600">{calorieData.servingUnit}</span>
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <input
                    type="range"
                    min="5"
                    max="400"
                    step="5"
                    value={portionSize}
                    onChange={(e) => setPortionSize(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                    <span>5{calorieData.servingUnit} (Bite)</span>
                    <span>100{calorieData.servingUnit} (Standard)</span>
                    <span>250{calorieData.servingUnit} (Bowl)</span>
                    <span>400{calorieData.servingUnit} (Large Meal)</span>
                  </div>
                </div>

                {/* Quick Preset Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-slate-400 mr-1">Quick Presets:</span>
                  {quickPortionChips.map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => setPortionSize(chip.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        portionSize === chip.value
                          ? "bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-400/40"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Live Calorie Calculation Output */}
              <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                  {/* Big Number */}
                  <div className="md:col-span-6 space-y-1 text-center md:text-left">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-100 flex items-center justify-center md:justify-start gap-1">
                      <Flame className="w-4 h-4 fill-white" />
                      <span>Total Energy for {portionSize}{calorieData.servingUnit}</span>
                    </span>
                    <div className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-sm">
                      {calorieData.totalKcal !== null ? calorieData.totalKcal : "N/A"}{" "}
                      <span className="text-xl sm:text-2xl font-bold opacity-90">kcal</span>
                    </div>
                    <p className="text-xs text-amber-100 font-medium">
                      Provides <strong className="text-white underline">{calorieData.dailyPercentage}%</strong> of the standard adult daily recommendation (2,000 kcal).
                    </p>
                  </div>

                  {/* Energy Density & Advice Card */}
                  <div className="md:col-span-6 bg-slate-950/30 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                        Energy Density Rating
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-white/20 text-white">
                        {calorieData.density.level}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {isMalayalam && calorieData.density.labelMl ? calorieData.density.labelMl : calorieData.density.label}
                    </p>

                    {/* Progress Bar of Daily Value */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-amber-100 font-bold">
                        <span>Daily Intake Share</span>
                        <span>{calorieData.dailyPercentage}% of 2,000 kcal</span>
                      </div>
                      <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, calorieData.dailyPercentage)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Burn-Off Activity Equivalents (വ്യായാമ തുല്യത) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span>{t.calorieScreen?.burnOffTitle || "Exercise Required to Burn This Off"}</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Estimated physical activity for an average adult to burn {calorieData.totalKcal} kcal
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                    MET Rate Estimates
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Walking */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center hover:border-emerald-200 transition-colors">
                    <Footprints className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Walking</span>
                    <span className="text-xl font-black text-slate-900 block my-0.5">
                      {calorieData.burnOff.walkingMins}
                    </span>
                    <span className="text-[10px] text-slate-400">minutes (4.5 km/h)</span>
                  </div>

                  {/* Running */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center hover:border-orange-200 transition-colors">
                    <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Jogging / Run</span>
                    <span className="text-xl font-black text-slate-900 block my-0.5">
                      {calorieData.burnOff.runningMins}
                    </span>
                    <span className="text-[10px] text-slate-400">minutes (8.5 km/h)</span>
                  </div>

                  {/* Cycling */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center hover:border-sky-200 transition-colors">
                    <Bike className="w-5 h-5 text-sky-600 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Cycling</span>
                    <span className="text-xl font-black text-slate-900 block my-0.5">
                      {calorieData.burnOff.cyclingMins}
                    </span>
                    <span className="text-[10px] text-slate-400">minutes (15 km/h)</span>
                  </div>

                  {/* Swimming */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center hover:border-teal-200 transition-colors">
                    <Waves className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">Swimming</span>
                    <span className="text-xl font-black text-slate-900 block my-0.5">
                      {calorieData.burnOff.swimmingMins}
                    </span>
                    <span className="text-[10px] text-slate-400">minutes (moderate)</span>
                  </div>
                </div>
              </div>

              {/* 6. Macronutrient Energy Breakdown */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900">
                    {t.calorieScreen?.macroSplitTitle || "Macronutrient Energy Contribution"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Energy derived from Carbohydrates (4 kcal/g), Protein (4 kcal/g), and Fat (9 kcal/g)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl">
                    <span className="text-[11px] font-bold text-amber-800 uppercase block">Carbohydrates / Sugar</span>
                    <span className="text-lg font-black text-amber-950 mt-1 block">
                      {calorieData.macros.carbsKcal} kcal
                    </span>
                    <span className="text-[10px] text-amber-700">
                      {Math.round((calorieData.macros.carbsKcal / (calorieData.macros.totalMacroKcal || 1)) * 100)}% of energy
                    </span>
                  </div>

                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase block">Protein</span>
                    <span className="text-lg font-black text-emerald-950 mt-1 block">
                      {calorieData.macros.proteinKcal} kcal
                    </span>
                    <span className="text-[10px] text-emerald-700">
                      {Math.round((calorieData.macros.proteinKcal / (calorieData.macros.totalMacroKcal || 1)) * 100)}% of energy
                    </span>
                  </div>

                  <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-2xl">
                    <span className="text-[11px] font-bold text-rose-800 uppercase block">Fats / Lipids</span>
                    <span className="text-lg font-black text-rose-950 mt-1 block">
                      {calorieData.macros.fatKcal} kcal
                    </span>
                    <span className="text-[10px] text-rose-700">
                      {Math.round((calorieData.macros.fatKcal / (calorieData.macros.totalMacroKcal || 1)) * 100)}% of energy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. Quick Product Switcher */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          Check calories for another product:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {productsList.map((p) => {
            const isSelected = currentProduct?.id === p.id;
            const isFood = isFoodProduct(p);
            return (
              <button
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-amber-500 bg-amber-50/50 shadow-xs ring-2 ring-amber-500/20"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-20 object-contain bg-white rounded-xl mb-1.5 p-1"
                />
                <span className="text-[11px] font-bold text-slate-800 line-clamp-1 block">
                  {isMalayalam && p.nameMl ? p.nameMl : p.name}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {isFood ? `${p.nutritionalInfo?.calories ?? "N/A"} kcal/100g` : "0 kcal (Tech)"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
