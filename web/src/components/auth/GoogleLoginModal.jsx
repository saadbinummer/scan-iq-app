import React, { useState, useEffect } from "react";
import {
  X,
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  User,
  LogOut,
  Sparkles,
  Heart,
  Sliders
} from "lucide-react";
import {
  getCurrentUser,
  loginWithGoogle,
  logout,
  getDietaryPreferences,
  saveDietaryPreferences
} from "../../services/authService";

export default function GoogleLoginModal({ isOpen, onClose, t }) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [dietaryPrefs, setDietaryPrefs] = useState(getDietaryPreferences());
  const [isSavedToast, setIsSavedToast] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setDietaryPrefs(getDietaryPreferences());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    const user = loginWithGoogle();
    setCurrentUser(user);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const handleTogglePref = (key) => {
    const updated = { ...dietaryPrefs, [key]: !dietaryPrefs[key] };
    setDietaryPrefs(updated);
    saveDietaryPreferences(updated);
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  const filterOptions = [
    {
      key: "nutAllergy",
      label: "Peanut & Tree Nut Allergy",
      labelMl: "നിലക്കടല & നട്സ് അലർജി",
      icon: "🥜",
      desc: "Triggers critical warnings if peanuts, cashews, or almonds are detected."
    },
    {
      key: "dairyIntolerant",
      label: "Lactose / Dairy Sensitivity",
      labelMl: "ലാക്ടോസ് / പാൽ അലർജി",
      icon: "🥛",
      desc: "Alerts when milk solids, butter, or dairy emulsifiers are found."
    },
    {
      key: "glutenFree",
      label: "Gluten-Free / Celiac Diet",
      labelMl: "ഗ്ലൂട്ടൻ ഫ്രീ / സീലിയാക്",
      icon: "🌾",
      desc: "Alerts if wheat, barley, maida, or malted gluten ingredients are present."
    },
    {
      key: "diabeticMode",
      label: "Diabetic / Low-Sugar Monitor",
      labelMl: "ഡയബറ്റിക് / ലോ-ഷുഗർ മോഡ്",
      icon: "🩸",
      desc: "Flashes high-priority warning if sugar exceeds 15g/100g."
    },
    {
      key: "palmOilFree",
      label: "Palm-Oil Free Preference",
      labelMl: "പാം-ഓയിൽ ഒഴിവാക്കുക",
      icon: "🌴",
      desc: "Flags products containing refined palm oil or industrial palmolein."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                {currentUser ? "NutriVerse Member Profile" : "Google Sign-In"}
              </h3>
              <p className="text-xs text-slate-400">
                {currentUser ? "Personalized Health & Dietary Filter" : "Unlock Scan History & Custom Allergy Filters"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {!currentUser ? (
            /* Unauthenticated View */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white">Sign in with Google</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Automatically save your scanned products, bookmark favorites, and get custom warnings tailored to your health profile.
                </p>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer ring-2 ring-slate-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          ) : (
            /* Logged In View: Profile + Allergy / Sensitivity Toggles */
            <div className="space-y-4">
              {/* User Identity Card */}
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-400"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                      <span>{currentUser.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Personalized Allergy Filter Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    <span>My Allergy & Dietary Shield</span>
                  </span>
                  {isSavedToast && (
                    <span className="text-[10px] text-emerald-400 font-bold animate-fadeIn">
                      ✓ Profile Updated
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Select your dietary restrictions. NutriVerse will immediately warn you whenever a scanned food item conflicts with your profile.
                </p>

                <div className="space-y-2 pt-1 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                  {filterOptions.map((opt) => {
                    const isChecked = !!dietaryPrefs[opt.key];
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleTogglePref(opt.key)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? "bg-emerald-950/40 border-emerald-500/60 text-white"
                            : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{opt.icon}</span>
                          <div>
                            <div className="text-xs font-bold">{opt.label}</div>
                            <div className="text-[10px] text-slate-400 line-clamp-1">{opt.desc}</div>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-emerald-500 border-emerald-400 text-slate-950"
                              : "border-slate-700 bg-slate-900"
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-[11px] text-slate-500">
            Powered by vornixverse • Created by Saad
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            {t?.common?.close || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}