import React from "react";
import {
  ScanLine,
  Activity,
  Flame,
  ShoppingBag,
  Store,
  ArrowLeftRight,
  HelpCircle,
  History,
  Bot,
  Sparkles
} from "lucide-react";

export default function LuxuryBottomNav({ currentTab, onTabChange, t }) {
  const isMl = t?.appName?.includes("ന്യൂട്രി");

  const tabs = [
    { id: "scan", label: isMl ? "സ്കാൻ" : "Scan", icon: ScanLine },
    { id: "health", label: isMl ? "ഹെൽത്ത്" : "Health", icon: Activity },
    { id: "calorie", label: isMl ? "കലോറി" : "Calorie", icon: Flame },
    { id: "compare", label: isMl ? "കമ്പെയർ" : "Compare", icon: ArrowLeftRight },
    { id: "history", label: isMl ? "ഹിസ്റ്ററി" : "History", icon: History },
    { id: "deals", label: isMl ? "ഡീൽ" : "Deals", icon: ShoppingBag },
    { id: "storeVsOnline", label: isMl ? "കടകൾ" : "Stores", icon: Store },
    { id: "support", label: isMl ? "AI സപ്പോർട്ട്" : "AI Support", icon: Bot, isAi: true },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 px-0.5 py-1.5 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-8 gap-0.5 max-w-xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? tab.isAi
                    ? "text-amber-300 font-bold"
                    : "text-emerald-400 font-bold"
                  : tab.isAi
                  ? "text-amber-400 hover:text-amber-300"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {isActive && (
                <span className={`absolute -top-1.5 w-5 h-1 rounded-full shadow-xs ${
                  tab.isAi
                    ? "bg-gradient-to-r from-amber-400 to-emerald-400 shadow-amber-400/50"
                    : "bg-gradient-to-r from-emerald-400 to-teal-400 shadow-emerald-400/50"
                }`} />
              )}
              
              <div className="relative">
                <div
                  className={`p-1 rounded-lg transition-transform ${
                    isActive
                      ? tab.isAi
                        ? "scale-110 bg-amber-500/20"
                        : "scale-110 bg-emerald-500/15"
                      : tab.isAi
                      ? "bg-amber-500/10"
                      : ""
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? tab.isAi
                          ? "text-amber-300"
                          : "text-emerald-400"
                        : tab.isAi
                        ? "text-amber-400"
                        : "text-slate-400"
                    }`}
                  />
                </div>
                {tab.isAi && !isActive && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                  </span>
                )}
              </div>

              <span className={`text-[8px] sm:text-[9px] tracking-tight truncate w-full text-center mt-0.5 ${
                tab.isAi && !isActive ? "font-bold text-amber-300" : ""
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
