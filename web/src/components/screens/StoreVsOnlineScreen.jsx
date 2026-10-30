import React, { useState } from "react";
import {
  Store,
  Camera,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { checkStoreVsOnlinePrice } from "../../utils/storePriceChecker";
import { isFoodProduct } from "../../utils/unitPriceCalculator";

export default function StoreVsOnlineScreen({
  activeProduct,
  productsList,
  onSelectProduct,
  onOpenScanner,
  isMalayalam,
  t
}) {
  const [inStorePrice, setInStorePrice] = useState(activeProduct ? String(activeProduct.price) : "50");
  const displayName = isMalayalam && activeProduct?.nameMl ? activeProduct.nameMl : activeProduct?.name;

  const comparison = checkStoreVsOnlinePrice(activeProduct, inStorePrice);
  const isFood = isFoodProduct(activeProduct);

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.tabs.storeVsOnline}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.storeChecker.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            {t.storeChecker.subtitle}
          </p>

          <button
            onClick={onOpenScanner}
            className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:scale-95 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-slate-950" />
            <span>Scan Item In-Store</span>
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {activeProduct ? (
        <div className="space-y-6">
          {/* 2. Interactive Input Box: Shelf Price */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <img
                  src={activeProduct.imageUrl}
                  alt={displayName}
                  className="w-16 h-16 rounded-2xl object-contain bg-white border border-slate-200 p-1"
                />
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase">{activeProduct.brand}</span>
                  <h2 className="text-lg font-bold text-slate-900">{displayName}</h2>
                  <span className="text-xs text-slate-500">
                    {isFood && activeProduct.packageSize
                      ? `Net: ${activeProduct.packageSize.value}${activeProduct.packageSize.unit} • `
                      : `${activeProduct.category} • `}
                    MRP: ₹{activeProduct.mrp?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Input Control */}
            <div className="pt-6 max-w-lg">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.storeChecker.shelfPriceLabel}
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={inStorePrice}
                    onChange={(e) => setInStorePrice(e.target.value)}
                    placeholder={t.storeChecker.shelfPricePlaceholder}
                    className="w-full pl-9 pr-4 py-3 bg-slate-50 focus:bg-white text-slate-900 font-black text-xl rounded-2xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all shadow-inner"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Type the price printed on the supermarket sticker or showroom shelf.
              </p>
            </div>
          </div>

          {/* 3. Buying Verdict Result Card */}
          {comparison && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              {/* Verdict Announcement Banner */}
              <div
                className={`p-5 rounded-2xl border flex items-start gap-4 ${
                  comparison.verdict === "OVERPRICED"
                    ? "bg-rose-50 border-rose-300 text-rose-950"
                    : comparison.verdict === "CHEAPER"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                    : "bg-amber-50 border-amber-300 text-amber-950"
                }`}
              >
                {comparison.verdict === "OVERPRICED" ? (
                  <TrendingUp className="w-8 h-8 text-rose-600 shrink-0 mt-0.5" />
                ) : comparison.verdict === "CHEAPER" ? (
                  <TrendingDown className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" />
                )}

                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight mb-1">
                    {comparison.verdict === "OVERPRICED"
                      ? t.storeChecker.verdictOverpriced
                      : comparison.verdict === "CHEAPER"
                      ? t.storeChecker.verdictCheaper
                      : t.storeChecker.verdictFair}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {comparison.verdict === "OVERPRICED"
                      ? t.storeChecker.overpricedDetail
                          .replace("{diff}", comparison.absDiff?.toLocaleString())
                          .replace("{pct}", comparison.percentage)
                      : comparison.verdict === "CHEAPER"
                      ? t.storeChecker.cheaperDetail.replace("{diff}", comparison.absDiff?.toLocaleString())
                      : t.storeChecker.fairDetail}
                  </p>
                </div>
              </div>

              {/* Head-to-Head Numbers: In-Store vs Best Online */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Store Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                    <Store className="w-4 h-4 text-amber-600" />
                    <span>{t.storeChecker.storePriceEntered}</span>
                  </div>
                  <div className="text-3xl font-black text-slate-900">
                    ₹{Number(comparison.shelfPrice).toLocaleString()}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Physical Store / Showroom Shelf Price
                  </span>
                </div>

                {/* Online Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                      <ShoppingBag className="w-4 h-4 text-emerald-600" />
                      <span>{t.storeChecker.onlineLowestPrice}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      {comparison.lowestOnlineDeal?.store || comparison.lowestOnlineDeal?.platform || "Online"}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-slate-900">
                    ₹{Number(comparison.onlinePrice).toLocaleString()}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Final Payable Price (Includes Delivery & Discounts)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Quick Select another product */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          Select another product for in-store check:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {productsList.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                setInStorePrice(String(p.price));
              }}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeProduct?.id === p.id
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
              <span className="text-[10px] text-slate-500 block">₹{p.price.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
