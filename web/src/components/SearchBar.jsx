import React from "react";
import { Search, Camera, FileUp, Sparkles, Filter } from "lucide-react";

export default function SearchBar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenScanner,
  onOpenOcr,
  selectedCategory,
  onCategoryChange,
  onQuickSelect,
  t
}) {
  const quickItems = [
    { label: "Quaker Oats (1kg)", query: "Quaker" },
    { label: "Kellogg's Chocos", query: "Kellogg" },
    { label: "Britannia NutriChoice", query: "NutriChoice" },
    { label: "Good Day Cookies", query: "Good Day" },
    { label: "Valencia Orange Juice", query: "Orange" },
  ];

  const categories = [
    { id: "all", label: t.filters.all },
    { id: "snacks", label: t.filters.snacks },
    { id: "cereals", label: t.filters.cereals },
    { id: "beverages", label: t.filters.beverages },
  ];

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 mb-6">
      {/* Search Input Bar & Action Buttons */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit();
        }}
        className="flex flex-col md:flex-row gap-2.5 items-stretch"
      >
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 rtl:pl-4 rtl:pr-11 pr-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-sm sm:text-base rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center">
          <button
            type="submit"
            className="flex-1 sm:flex-none px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>{t.searchBtn}</span>
          </button>

          <button
            type="button"
            onClick={onOpenScanner}
            className="flex-1 sm:flex-none px-4 py-3 bg-teal-50 hover:bg-teal-100 active:scale-95 text-teal-800 border border-teal-200 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <Camera className="w-4 h-4 text-teal-600" />
            <span className="whitespace-nowrap">{t.scanBtn}</span>
          </button>

          <button
            type="button"
            onClick={onOpenOcr}
            className="flex-1 sm:flex-none px-4 py-3 bg-indigo-50 hover:bg-indigo-100 active:scale-95 text-indigo-800 border border-indigo-200 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <FileUp className="w-4 h-4 text-indigo-600" />
            <span className="whitespace-nowrap">{t.uploadOcrBtn}</span>
          </button>
        </div>
      </form>

      {/* Category Filter Pills & Quick Try Suggestions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Try shortcuts */}
        <div className="flex items-center gap-1.5 flex-wrap text-slate-500">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> {t.quickTry}
          </span>
          {quickItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onQuickSelect(item.query)}
              className="text-emerald-700 hover:text-emerald-900 underline underline-offset-2 hover:bg-emerald-50 px-1 py-0.5 rounded transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
