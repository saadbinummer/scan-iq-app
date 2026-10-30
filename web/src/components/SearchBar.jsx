import React, { useState } from "react";
import { Search, Camera, FileUp, Sparkles, Filter, Mic, MicOff } from "lucide-react";

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
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN"; // English/Indian context

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onSearchChange(transcript);
          if (onSearchSubmit) onSearchSubmit(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn("Speech recognition start failed:", err);
      setIsListening(false);
    }
  };

  const quickItems = [
    { label: "Maggi Noodles", query: "Maggi" },
    { label: "Amul Butter", query: "Amul" },
    { label: "Quaker Oats", query: "Quaker" },
    { label: "NutriChoice", query: "NutriChoice" },
    { label: "Dairy Milk", query: "Cadbury" },
    { label: "Lay's Chips", query: "Lay's" },
  ];

  const categories = [
    { id: "all", label: t?.filters?.all || "All" },
    { id: "snacks", label: t?.filters?.snacks || "Snacks" },
    { id: "cereals", label: t?.filters?.cereals || "Cereals & Grains" },
    { id: "beverages", label: t?.filters?.beverages || "Beverages" },
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
            placeholder={t?.searchPlaceholder || "Search any product, brand, or barcode..."}
            className="w-full pl-11 rtl:pl-4 rtl:pr-11 pr-12 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-sm sm:text-base rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />

          {/* Voice Search Mic Button */}
          <button
            type="button"
            onClick={startVoiceSearch}
            className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all cursor-pointer ${
              isListening
                ? "bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30 ring-2 ring-rose-300"
                : "text-slate-400 hover:text-emerald-600 hover:bg-slate-200/60"
            }`}
            title="Search by Voice (Click and speak)"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex gap-2">
          {/* Barcode Camera Button */}
          <button
            type="button"
            onClick={onOpenScanner}
            className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-slate-950 text-sm font-bold rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>{t?.scanBtn || "Scan"}</span>
          </button>

          {/* Search Action */}
          <button
            type="submit"
            className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {t?.common?.search || "Search"}
          </button>
        </div>
      </form>

      {/* Quick Keywords Chips */}
      <div className="mt-3.5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Popular:
        </span>
        {quickItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onQuickSelect(item.query)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200/60 text-slate-600 font-medium transition-colors cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
