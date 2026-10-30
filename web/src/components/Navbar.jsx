import React from "react";
import { Scale, Globe, Sparkles } from "lucide-react";

export const languages = [
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳", dir: "ltr" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
];

export default function Navbar({ currentLang, onLanguageChange, t }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-700 to-teal-800 bg-clip-text text-transparent">
                  CompareAnything
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <Sparkles className="w-3 h-3 mr-1" /> Global v2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="relative inline-flex items-center">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3 rtl:left-auto rtl:right-3 pointer-events-none" />
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="appearance-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs sm:text-sm pl-9 rtl:pl-3 rtl:pr-9 pr-8 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer shadow-xs"
                aria-label="Select Language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-2 text-slate-500 text-xs">
                ▼
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
