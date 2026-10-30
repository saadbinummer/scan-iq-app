import React, { useState, useMemo } from "react";
import {
  Camera,
  FileUp,
  Search,
  Sparkles,
  Smartphone,
  Apple,
  ExternalLink,
  ChevronRight,
  Filter,
  Layers,
  Scale,
  Zap,
  ShieldCheck,
  Tag
} from "lucide-react";
import { isFoodProduct } from "../../utils/unitPriceCalculator";

export default function ScanScreen({
  productsList,
  onSelectProduct,
  onOpenScanner,
  onOpenOcr,
  onQuickScanBarcode,
  onSetSlot1,
  onSetSlot2,
  isMalayalam,
  t
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); // "all" | "food" | "electronics"

  // Quick Demo Barcode triggers for instant testing without camera
  const quickDemoBarcodes = [
    { name: "Maggi Masala Noodles", code: "8901058852448", type: "food", icon: "🍜" },
    { name: "Amul Butter 100g", code: "8901262010054", type: "food", icon: "🧈" },
    { name: "Britannia NutriChoice", code: "8901030382345", type: "food", icon: "🍪" },
    { name: "Lay's Magic Masala", code: "8901491101837", type: "food", icon: "🥔" },
    { name: "Cadbury Dairy Milk", code: "8901233024844", type: "food", icon: "🍫" },
    { name: "Quaker Rolled Oats", code: "8901499008544", type: "food", icon: "🥣" },
    { name: "iPhone 15 (128GB)", code: "195949012345", type: "tech", icon: "📱" },
    { name: "Galaxy S24 5G", code: "8806091876543", type: "tech", icon: "🤖" },
    { name: "Slice Mango Drink", code: "8901725181155", type: "food", icon: "🥭" }
  ];

  // Filtered products list
  const filteredProducts = useMemo(() => {
    let list = productsList || [];

    if (categoryFilter === "food") {
      list = list.filter(p => isFoodProduct(p));
    } else if (categoryFilter === "electronics") {
      list = list.filter(p => p.productType === "electronics");
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.nameMl && p.nameMl.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      p.barcode.includes(q)
    );
  }, [productsList, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn">
      {/* 1. Hero Scanner Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ScanIQ Intelligence Engine</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2">
            {t.scanScreen.heroTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            {t.scanScreen.heroSubtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenScanner}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer ring-2 ring-emerald-400/40"
            >
              <Camera className="w-4 h-4 text-slate-950" />
              <span>{t.scanScreen.scanBarcodeBtn}</span>
            </button>

            <button
              onClick={onOpenOcr}
              className="px-5 py-3 bg-slate-800/90 hover:bg-slate-700/90 active:scale-95 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileUp className="w-4 h-4 text-emerald-400" />
              <span>{t.scanScreen.uploadPhotoBtn}</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Instant Search Bar & Filter Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.scanScreen.searchPlaceholder}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-3.5 rounded-2xl border border-slate-200 text-slate-900 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all shadow-inner"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.scanScreen.allProducts}
            </button>
            <button
              onClick={() => setCategoryFilter("food")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === "food"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              🥗 {t.scanScreen.foodOnly}
            </button>
            <button
              onClick={() => setCategoryFilter("electronics")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === "electronics"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              📱 {t.scanScreen.electronicsOnly}
            </button>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            {filteredProducts.length} items found
          </span>
        </div>
      </div>

      {/* 3. Quick Barcode Test Triggers */}
      <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200/80">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
          {t.scanScreen.quickScanTitle}
        </span>
        <div className="flex flex-wrap gap-2">
          {quickDemoBarcodes.map((demo) => (
            <button
              key={demo.code}
              onClick={() => onQuickScanBarcode(demo.code)}
              className="px-3 py-1.5 bg-white hover:bg-emerald-50 hover:border-emerald-300 active:scale-95 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{demo.icon}</span>
              <span>{demo.name}</span>
              <span className="text-[10px] font-mono text-slate-400">({demo.code.slice(-4)})</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Products Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {t.scanScreen.recentlyScanned}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => {
            const isFood = isFoodProduct(product);
            const displayName = isMalayalam && product.nameMl ? product.nameMl : product.name;
            const displayCat = isMalayalam && product.categoryMl ? product.categoryMl : product.category;

            const deals = product.deals || [];
            const minPayable = deals.length > 0
              ? Math.min(...deals.map(d => d.finalPayable !== undefined ? d.finalPayable : d.price))
              : product.price;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Category Pill */}
                  <div className="relative h-44 w-full bg-slate-50 rounded-2xl overflow-hidden mb-3 border border-slate-100 flex items-center justify-center p-2">
                    <img
                      src={product.imageUrl}
                      alt={displayName}
                      className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-xs ${
                      isFood ? "bg-emerald-600/90 text-white" : "bg-sky-600/90 text-white"
                    }`}>
                      {isFood ? t.scanScreen.foodBadge : t.scanScreen.electronicsBadge}
                    </span>
                  </div>

                  {/* Brand & Category */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-bold text-slate-700">{product.brand}</span>
                    <span className="text-[11px] font-medium">{displayCat}</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
                    {displayName}
                  </h3>

                  {/* Specs or Nutrition summary chip */}
                  <div className="text-[11px] text-slate-500 mb-3">
                    {isFood ? (
                      <span className="inline-block bg-slate-100 px-2 py-0.5 rounded-md text-slate-700 font-medium">
                        {product.packageSize?.value} {product.packageSize?.unit} • {product.nutritionalInfo?.calories || "N/A"} kcal
                      </span>
                    ) : (
                      <span className="inline-block bg-slate-100 px-2 py-0.5 rounded-md text-slate-700 font-medium">
                        {product.specs?.Display || product.specs?.Processor || "Tech Device"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing & Click Action */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Best Price</span>
                      <span className="text-lg font-black text-emerald-600">
                        ₹{minPayable.toLocaleString()}
                      </span>
                    </div>
                    {product.mrp && product.mrp > minPayable && (
                      <span className="text-xs text-slate-400 line-through">
                        MRP ₹{product.mrp.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="col-span-4 px-3 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>{t.scanScreen.viewDetailBtn}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSetSlot1(product)}
                      className="col-span-1 p-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center cursor-pointer border border-slate-200"
                      title="Add to Compare Slot 1"
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
