import React, { useState } from "react";
import {
  HelpCircle,
  Bot,
  Send,
  Sparkles,
  AlertTriangle,
  FileQuestion,
  CheckCircle2,
  Globe,
  Sliders,
  ShieldAlert
} from "lucide-react";
import { askGroceryAssistant, getSessionQuestionCount, isRateLimitReached } from "../../services/aiAssistant";
import { languages } from "../Navbar";

export default function CustomerSupportScreen({
  activeProduct,
  currentLang,
  onLanguageChange,
  isMalayalam,
  t
}) {
  // AI Assistant Chat State
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: isMalayalam
        ? "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ ഗ്രോസറി അസിസ്റ്റന്റാണ്. ഭക്ഷണ ചേരുവകൾ, ഷുഗർ അളവ്, അഡിറ്റീവുകൾ (INS കോഡുകൾ), അല്ലെങ്കിൽ യൂണിറ്റ് വില എന്നിവയെക്കുറിച്ച് എന്നോട് ചോദിക്കാം."
        : "Hello! I am your Grocery Assistant. Ask me about ingredients, sugar/fat levels, additive INS codes, or True Value comparisons."
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Data error report form state
  const [reportProduct, setReportProduct] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const suggestedQuestions = isMalayalam
    ? [
        "പാമോയിൽ ബിസ്ക്കറ്റുകളിൽ ദോഷകരമാണോ?",
        "പ്രമേഹമുള്ളവർക്ക് അനുയോജ്യമായ സ്നാക്സ് ഏതാണ്?",
        "INS 500ii എന്നാൽ എന്താണ്?",
        "ട്രൂ വാല്യൂ എങ്ങനെ കണക്കാക്കാം?"
      ]
    : [
        "Is palm oil bad in biscuits?",
        "What snacks are suitable for diabetics?",
        "What does INS 500ii mean?",
        "How is True Value calculated?"
      ];

  const handleSendMessage = async (queryToSend = null) => {
    const text = (queryToSend || inputQuery).trim();
    if (!text || isTyping) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInputQuery("");
    setIsTyping(true);

    try {
      const response = await askGroceryAssistant(text, activeProduct, currentLang);
      setMessages([
        ...newMessages,
        {
          sender: "assistant",
          text: response.answer || response.message,
          isWarning: response.isMedicalWarning
        }
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          sender: "assistant",
          text: "Error retrieving grocery assistant knowledge. Please try again."
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportProduct || !reportDesc) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setReportProduct("");
      setReportDesc("");
      setReportSubmitted(false);
    }, 4000);
  };

  const questionsCount = getSessionQuestionCount();
  const limitReached = isRateLimitReached();

  return (
    <div className="space-y-8 pb-20 lg:pb-10 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.tabs.support}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            {t.support.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.support.subtitle}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Interactive AI Grocery Assistant (Left 2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[560px]">
          {/* Chat Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{t.support.aiChatTitle}</h3>
                <span className="text-[11px] text-slate-500">
                  Session Limit: {questionsCount}/10 inquiries
                </span>
              </div>
            </div>

            <span className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-semibold">
              Strictly No Medical Prescriptions
            </span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 custom-scrollbar bg-slate-50/30">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    m.sender === "user"
                      ? "bg-slate-900 text-white rounded-br-none"
                      : m.isWarning
                      ? "bg-amber-50 text-amber-950 border border-amber-300 rounded-bl-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2 text-xs text-slate-400 animate-pulse">
                  AI is analyzing grocery data...
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggested Prompt Chips */}
          <div className="p-2.5 bg-slate-100/70 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-slate-400 font-bold px-1 shrink-0">Try:</span>
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                disabled={limitReached}
                onClick={() => handleSendMessage(q)}
                className="bg-white hover:bg-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-lg border border-slate-200 whitespace-nowrap transition-colors cursor-pointer disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            {limitReached ? (
              <div className="text-center p-2 text-xs font-semibold text-rose-700 bg-rose-50 rounded-xl">
                {t.support.rateLimitMsg}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={t.support.aiPlaceholder}
                  className="flex-1 px-4 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.support.send}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 3. Settings & Preferences (Right Column) */}
        <div className="space-y-6">
          {/* Settings Box */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-600" /> {t.support.settingsTitle}
            </h3>

            {/* Language Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-400" /> {t.support.languageLabel}
              </label>
              <select
                value={currentLang}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white font-medium"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Units Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t.support.unitSystem}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button className="py-2 px-3 rounded-xl bg-slate-900 text-white font-bold">
                  Metric (g, ml, kg)
                </button>
                <button className="py-2 px-3 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200">
                  Imperial (oz, lb)
                </button>
              </div>
            </div>
          </div>

          {/* 4. Creator & Universe Attribution Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Platform Origins & Creator</span>
            </div>
            <h4 className="text-base font-black text-white">
              ScanIQ Ecosystem
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed and engineered by <strong className="text-amber-300 font-bold">Saad</strong> as part of the <strong className="text-emerald-400 font-bold">vornixverse</strong> digital universe.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                🌌 Universe: vornixverse
              </span>
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                👤 Created by: Saad
              </span>
            </div>
          </div>

          {/* 5. Report Product Data Error Form */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
              <FileQuestion className="w-4 h-4 text-amber-600" /> {t.support.reportErrorTitle}
            </h3>
            <p className="text-[11px] text-slate-500 mb-3">
              Help keep food data accurate. Found an incorrect price or wrong nutrient on a label?
            </p>

            {reportSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.support.reportSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3">
                <input
                  type="text"
                  value={reportProduct}
                  onChange={(e) => setReportProduct(e.target.value)}
                  placeholder={t.support.reportNamePlaceholder}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50"
                  required
                />
                <textarea
                  rows={2}
                  value={reportDesc}
                  onChange={(e) => setReportDesc(e.target.value)}
                  placeholder={t.support.reportDescPlaceholder}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {t.support.submitReport}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
