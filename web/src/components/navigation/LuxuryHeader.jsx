import React from "react";
import {
  ScanLine,
  Globe,
  Sparkles,
  Activity,
  Flame,
  ShoppingBag,
  Store,
  ArrowLeftRight,
  HelpCircle,
  Scan
} from "lucide-react";
import { languages } from "../Navbar";

export default function LuxuryHeader({ currentTab, onTabChange, currentLang, onLanguageChange, t }) {
  const tabsList = [
    { id: "scan", label: t.tabs.scan, icon: ScanLine },
    { id: "health", label: t.tabs.health, icon: Activity },
    { id: "calorie", label: t.tabs.calorie || "Calorie IQ", icon: Flame },
    { id: "compare", label: t.tabs.compare, icon: ArrowLeftRight },
    { id: "deals", label: t.tabs.deals, icon: ShoppingBag },
    { id: "storeVsOnline", label: t.tabs.storeVsOnline, icon: Store },
    { id: "support", label: t.tabs.support, icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer group"
            onClick={() => onTabChange("scan")}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400/40 group-hover:scale-105 transition-transform">
              <Scan className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                  ScanIQ
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3 mr-1 text-amber-400" /> PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5 flex-wrap">
                <span>{t.tagline}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">vornixverse</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300 font-semibold">By Saad</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse bg-slate-800/80 p-1 rounded-2xl border border-slate-700/60 shadow-inner">
            {tabsList.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="relative inline-flex items-center">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="appearance-none bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm pl-9 rtl:pl-3 rtl:pr-9 pr-8 py-2 rounded-xl border border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer shadow-sm"
                aria-label="Select Language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-800 text-slate-100">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-2.5 text-slate-400">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
