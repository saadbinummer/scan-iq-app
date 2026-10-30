import React from "react";
import {
  ScanLine,
  Activity,
  Flame,
  ShoppingBag,
  Store,
  ArrowLeftRight,
  HelpCircle,
  History
} from "lucide-react";

export default function LuxuryBottomNav({ currentTab, onTabChange, t }) {
  const tabs = [
    { id: "scan", label: t.tabs.scan, icon: ScanLine },
    { id: "health", label: t.tabs.health, icon: Activity },
    { id: "calorie", label: t.tabs.calorie || "Calorie", icon: Flame },
    { id: "compare", label: t.tabs.compare, icon: ArrowLeftRight },
    { id: "history", label: "History", icon: History },
    { id: "deals", label: t.tabs.deals, icon: ShoppingBag },
    { id: "storeVsOnline", label: t.tabs.storeVsOnline, icon: Store },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 px-0.5 py-1 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-7 gap-0.5 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? "text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-5 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full shadow-xs shadow-emerald-400/50" />
              )}
              <div className={`p-1 rounded-lg transition-transform ${isActive ? "scale-110 bg-emerald-500/15" : ""}`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
              </div>
              <span className="text-[8.5px] tracking-tight truncate w-full text-center mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}