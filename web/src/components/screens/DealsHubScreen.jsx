import React, { useState } from "react";
import {
  ShoppingBag,
  ExternalLink,
  Tag,
  Truck,
  Sparkles,
  ShieldCheck,
  Info,
  CheckCircle2
} from "lucide-react";
import { isFoodProduct } from "../../utils/unitPriceCalculator";

export default function DealsHubScreen({
  activeProduct,
  productsList,
  onSelectProduct,
  isMalayalam,
  t
}) {
  const [selectedStoreFilter, setSelectedStoreFilter] = useState("all");
  const displayName = isMalayalam && activeProduct?.nameMl ? activeProduct.nameMl : activeProduct?.name;
  const isFood = isFoodProduct(activeProduct);

  // Compute final payable price for all deals
  const dealsWithFinal = (activeProduct?.deals || []).map((deal) => {
    const base = Number(deal.price || 0);
    const delivery = Number(deal.delivery || deal.deliveryFee || 0);
    const discount = Number(deal.discount || 0);
    const finalPrice = deal.finalPayable !== undefined ? Number(deal.finalPayable) : Math.max(0, base + delivery - discount);
    return {
      ...deal,
      base,
      delivery,
      discount,
      finalPrice
    };
  });

  // Identify lowest payable price
  const lowestFinalPrice = dealsWithFinal.length > 0
    ? Math.min(...dealsWithFinal.map((d) => d.finalPrice))
    : activeProduct?.price || 0;

  // Filter deals
  const filteredDeals = selectedStoreFilter === "all"
    ? dealsWithFinal
    : dealsWithFinal.filter((d) => (d.store || d.platform || "").toLowerCase().includes(selectedStoreFilter.toLowerCase()));

  const storeFilters = [
    { id: "all", label: "All Stores" },
    { id: "amazon", label: "Amazon" },
    { id: "flipkart", label: "Flipkart" },
    { id: "blinkit", label: "Blinkit" },
    { id: "bigbasket", label: "BigBasket" },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.tabs.deals}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.dealsHub.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.dealsHub.subtitle}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Transparent Provenance Notice Banner */}
      <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 shadow-xs">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-0.5">Transparent Price Provenance Policy:</span>
          <p className="leading-relaxed">{t.dealsHub.priceDisclaimer}</p>
          <div className="flex items-center gap-3 mt-2 font-semibold">
            <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              {t.dealsHub.liveApiBadge} = Active Affiliate API
            </span>
            <span className="inline-flex items-center gap-1 text-slate-800 bg-slate-200 px-2 py-0.5 rounded-md">
              {t.dealsHub.catalogMrpBadge} = Official Catalog Benchmark
            </span>
          </div>
        </div>
      </div>

      {activeProduct ? (
        <div className="space-y-6">
          {/* Active Product Overview Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={activeProduct.imageUrl}
                alt={displayName}
                className="w-16 h-16 rounded-2xl object-contain bg-white border border-slate-200 p-1"
              />
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase">{activeProduct.brand}</span>
                <h2 className="text-lg font-bold text-slate-900">{displayName}</h2>
                <span className="text-xs text-slate-500">
                  {isFood && activeProduct.packageSize
                    ? `Size: ${activeProduct.packageSize.value}${activeProduct.packageSize.unit} • `
                    : `${activeProduct.category} • `}
                  MRP: ₹{activeProduct.mrp?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Store Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {storeFilters.map((sf) => (
                <button
                  key={sf.id}
                  onClick={() => setSelectedStoreFilter(sf.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedStoreFilter === sf.id
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {sf.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Retail Deals Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDeals.map((deal, idx) => {
              const isBest = deal.finalPrice === lowestFinalPrice;
              const isLiveFeed = deal.dataType === "LIVE_API_FEED" || deal.store.includes("Amazon") || deal.store.includes("Flipkart");

              return (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                    isBest
                      ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                      : "border-slate-200 shadow-xs hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Store Title & Badges */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-base text-slate-900">{deal.store || deal.platform}</h3>
                        <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md mt-1 ${
                          isLiveFeed
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {isLiveFeed ? t.dealsHub.liveApiBadge : t.dealsHub.catalogMrpBadge}
                        </span>
                      </div>

                      {isBest && (
                        <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {t.dealsHub.bestValueStore}
                        </span>
                      )}
                    </div>

                    {/* Breakdown Calculation: Base + Delivery - Discount */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-600 my-4">
                      <div className="flex justify-between">
                        <span>{t.dealsHub.basePrice}:</span>
                        <span className="font-semibold text-slate-800">₹{deal.base?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-slate-400" /> {t.dealsHub.deliveryFee}:
                        </span>
                        <span className={`font-semibold ${deal.delivery === 0 ? "text-emerald-700 font-bold" : "text-slate-800"}`}>
                          {deal.delivery === 0 ? "FREE" : `₹${deal.delivery}`}
                        </span>
                      </div>
                      {deal.discount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-medium">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3.5 h-3.5" /> {t.dealsHub.discount} {deal.coupon ? `(${deal.coupon})` : ""}:
                          </span>
                          <span>-₹{deal.discount?.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Final Payable Price Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                        {t.dealsHub.finalPayable}
                      </span>
                      <span className="text-2xl font-black text-slate-900">
                        ₹{deal.finalPrice?.toLocaleString()}
                      </span>
                    </div>

                    <a
                      href={deal.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Visit Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Quick Switcher */}
      <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200">
        <h3 className="font-bold text-slate-900 text-sm mb-3">
          Check deals for other items:
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {productsList.map((p) => (
            <button
              key={p.id}
              onClick={() => onSelectProduct(p)}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeProduct?.id === p.id
                  ? "border-indigo-500 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-500/20"
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
