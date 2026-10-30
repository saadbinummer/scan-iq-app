import React from "react";
import { ShieldAlert, ExternalLink } from "lucide-react";

export default function DisclaimerBanner({ t }) {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300 py-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Medical & Accuracy Disclaimer */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="font-bold text-amber-300 block mb-1">
              Important Medical & Dietary Notice:
            </span>
            {t.dataDisclaimer}
          </div>
        </div>

        {/* Data Sources and Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-slate-800/80 pt-6">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-semibold text-slate-300">Data Sources:</span>
            <a
              href="https://world.openfoodfacts.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              OpenFoodFacts (CC-BY-SA 4.0) <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://fdc.nal.usda.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              USDA FoodData Central <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs">
            <span className="font-semibold text-slate-400">NutriVerse &copy; 2026</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Powered by vornixverse
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
              Created by Saad
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
