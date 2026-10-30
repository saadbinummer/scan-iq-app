import React, { useState, useEffect } from "react";
import {
  History,
  Star,
  Trash2,
  ExternalLink,
  Flame,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Tag
} from "lucide-react";
import {
  getScanHistory,
  clearScanHistory,
  getFavorites,
  toggleFavorite,
  getCurrentUser
} from "../../services/authService";

export default function HistoryFavoritesScreen({
  onSelectProduct,
  onOpenScanner,
  onOpenLogin,
  isMalayalam,
  t
}) {
  const [activeSubTab, setActiveSubTab] = useState("history"); // "history" | "favorites"
  const [historyList, setHistoryList] = useState(getScanHistory());
  const [favoritesList, setFavoritesList] = useState(getFavorites());
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    const update = () => {
      setHistoryList(getScanHistory());
      setFavoritesList(getFavorites());
      setCurrentUser(getCurrentUser());
    };

    window.addEventListener("scaniq_history_change", update);
    window.addEventListener("scaniq_favorites_change", update);
    window.addEventListener("scaniq_auth_change", update);
    return () => {
      window.removeEventListener("scaniq_history_change", update);
      window.removeEventListener("scaniq_favorites_change", update);
      window.removeEventListener("scaniq_auth_change", update);
    };
  }, []);

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire scan history?")) {
      clearScanHistory();
    }
  };

  const handleRemoveFavorite = (e, item) => {
    e.stopPropagation();
    toggleFavorite(item);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-10 animate-fadeIn max-w-5xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Personal Product Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {isMalayalam ? "സ്കാൻ ഹിസ്റ്ററിയും ഫേവറിറ്റ്സും" : "Scan History & Saved Favorites"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {isMalayalam
                ? "നിങ്ങൾ ഇതിനകം പരിശോധിച്ച ഉൽപ്പന്നങ്ങളും പ്രിയപ്പെട്ട ബ്രാൻഡുകളും ഇവിടെ എളുപ്പത്തിൽ ആക്സസ് ചെയ്യാം."
                : "Quickly access your recently scanned grocery items, compare previous checks, and organize your favorite healthy choices."}
            </p>
          </div>

          {!currentUser && (
            <button
              onClick={onOpenLogin}
              className="px-4 py-2.5 bg-white text-slate-950 hover:bg-slate-100 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer w-fit"
            >
              <span>Sign in with Google</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveSubTab("history")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === "history"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <History className="w-4 h-4" />
            <span>{isMalayalam ? "സ്കാൻ ഹിസ്റ്ററി" : "Scan History"}</span>
            <span className="px-1.5 py-0.2 bg-black/20 rounded-md text-[10px]">
              {historyList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("favorites")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeSubTab === "favorites"
                ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>{isMalayalam ? "ഫേവറിറ്റ്സ്" : "Saved Favorites"}</span>
            <span className="px-1.5 py-0.2 bg-black/20 rounded-md text-[10px]">
              {favoritesList.length}
            </span>
          </button>

          {activeSubTab === "history" && historyList.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="ml-auto text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 p-2 rounded-lg hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Content Lists */}
      {activeSubTab === "history" ? (
        /* ================= HISTORY LIST ================= */
        historyList.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
              <History className="w-7 h-7" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-base">
              {isMalayalam ? "ഹിസ്റ്ററി ലഭ്യമല്ല" : "No Scan History Yet"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isMalayalam
                ? "ഏതെങ്കിലും ബാർകോഡ് സ്കാൻ ചെയ്യുകയോ സെർച്ച് ചെയ്യുകയോ ചെയ്താൽ അവ ഇവിടെ സ്വയം സൂക്ഷിക്കപ്പെടും."
                : "Scan a grocery product barcode or pick an item to automatically log its calorie and health breakdown here."}
            </p>
            <button
              onClick={onOpenScanner}
              className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
            >
              Start Scanning
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {historyList.map((item) => (
              <div
                key={item.barcode + item.scannedAt}
                onClick={() => onSelectProduct(item)}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-emerald-500/50 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 p-1 shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                      {item.brand || "Verified Brand"}
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 truncate">
                      {isMalayalam && item.nameMl ? item.nameMl : item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      UPC: {item.barcode}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {item.calories && (
                      <span className="text-amber-600 font-bold flex items-center gap-0.5 text-[11px]">
                        <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{item.calories} kcal</span>
                      </span>
                    )}
                    <span className="font-black text-slate-900">₹{item.price}</span>
                  </div>

                  <span className="text-[10px] text-emerald-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* ================= FAVORITES LIST ================= */
        favoritesList.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
              <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-base">
              {isMalayalam ? "ഫേവറിറ്റ് ലിസ്റ്റ് ശൂന്യമാണ്" : "No Saved Favorites"}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isMalayalam
                ? "നിങ്ങൾക്ക് ഇഷ്ടപ്പെട്ട ഉൽപ്പന്നങ്ങൾ ബുക്ക്മാർക്ക് ചെയ്യാൻ പ്രോഡക്റ്റ് പേജിലെ സ്റ്റാർ (Star) ബട്ടൺ അമർത്തുക."
                : "Bookmark your favorite grocery and tech products by clicking the Star icon on any product intelligence card."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoritesList.map((item) => (
              <div
                key={item.barcode}
                onClick={() => onSelectProduct(item)}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-amber-400/60 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 p-1 shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                        {item.brand}
                      </span>
                      <button
                        onClick={(e) => handleRemoveFavorite(e, item)}
                        className="p-1 text-amber-400 hover:text-slate-400 rounded-md transition-colors"
                        title="Remove from favorites"
                      >
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </button>
                    </div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 truncate">
                      {isMalayalam && item.nameMl ? item.nameMl : item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      UPC: {item.barcode}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {item.calories && (
                      <span className="text-amber-600 font-bold flex items-center gap-0.5 text-[11px]">
                        <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{item.calories} kcal</span>
                      </span>
                    )}
                    <span className="font-black text-slate-900">₹{item.price}</span>
                  </div>

                  <span className="text-[10px] text-amber-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}