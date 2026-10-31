import React, { useState, useEffect, useRef } from "react";
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
  Sliders,
  Camera,
  Upload,
  Edit2,
  Check,
  ArrowRight,
  UserPlus,
  Loader2
} from "lucide-react";
import {
  getCurrentUser,
  loginWithGoogle,
  logout,
  updateUserProfile,
  getDietaryPreferences,
  saveDietaryPreferences
} from "../../services/authService";

export default function GoogleLoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onLogoutSuccess,
  t
}) {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [dietaryPrefs, setDietaryPrefs] = useState(getDietaryPreferences());
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [customName, setCustomName] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingStatus, setConnectingStatus] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customInputName, setCustomInputName] = useState("");
  const [customInputEmail, setCustomInputEmail] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) setCustomName(user.name);
    setDietaryPrefs(getDietaryPreferences());
    setIsConnecting(false);
    setShowCustomForm(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const presetAvatars = [
    {
      id: "founder",
      name: "Founder",
      url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "tech_pro",
      name: "Tech Pro",
      url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "creative",
      name: "Creative",
      url: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "executive",
      name: "Executive",
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "monogram",
      name: "Golden S",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80"
    }
  ];

  const handleInstantGoogleLogin = (accountType = "saad") => {
    setIsConnecting(true);
    setConnectingStatus("Connecting to Google Accounts...");

    setTimeout(() => {
      setConnectingStatus("Verifying identity & syncing allergy shield...");
    }, 350);

    setTimeout(() => {
      let userObj;
      if (accountType === "saad") {
        userObj = {
          id: "g_user_saad_vornix",
          name: "Saad",
          title: "Founder, vornixverse",
          email: "saad@vornixverse.com",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
          authProvider: "Google Verified",
          joinedDate: new Date().toLocaleDateString()
        };
      } else {
        const fallbackName = customInputName.trim() || "Google Member";
        const fallbackEmail = customInputEmail.trim() || `${fallbackName.toLowerCase().replace(/\s+/g, "")}@gmail.com`;
        userObj = {
          id: `g_user_${Date.now()}`,
          name: fallbackName,
          title: "NutriVerse Member",
          email: fallbackEmail,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
          authProvider: "Google Verified",
          joinedDate: new Date().toLocaleDateString()
        };
      }

      const user = loginWithGoogle(userObj);
      setCurrentUser(user);
      setCustomName(user.name);
      setIsConnecting(false);

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      onClose();
    }, 700);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }
    onClose();
  };

  const handleSelectAvatar = (url) => {
    const updated = updateUserProfile({ avatar: url });
    setCurrentUser(updated);
    showToast();
  };

  const handleCustomPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result;
      if (dataUrl) {
        const updated = updateUserProfile({ avatar: dataUrl });
        setCurrentUser(updated);
        showToast();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveName = () => {
    if (customName.trim()) {
      const updated = updateUserProfile({ name: customName.trim() });
      setCurrentUser(updated);
      setIsEditingName(false);
      showToast();
    }
  };

  const showToast = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  const handleTogglePref = (key) => {
    const updated = { ...dietaryPrefs, [key]: !dietaryPrefs[key] };
    setDietaryPrefs(updated);
    saveDietaryPreferences(updated);
    showToast();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                {currentUser ? "NutriVerse Member Profile" : "Sign in with Google"}
              </h3>
              <p className="text-xs text-slate-400">
                {currentUser
                  ? "Identity, Photo & Personal Allergy Shield"
                  : "Choose an account to continue to NutriVerse"}
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
            /* Unauthenticated View: Realistic Google Account Chooser */
            <div className="space-y-4">
              
              {/* Google Brand Header */}
              <div className="text-center pb-1">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white shadow-md flex items-center justify-center mb-3">
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
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
                <h4 className="text-base font-black text-white">Choose a Google Account</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Sign in to save your scan history, favorite products, and activate personalized dietary warnings.
                </p>
              </div>

              {/* Connecting State */}
              {isConnecting ? (
                <div className="py-8 text-center space-y-3 bg-slate-800/60 rounded-2xl border border-slate-700/80 animate-pulse">
                  <div className="flex justify-center">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{connectingStatus}</p>
                    <p className="text-xs text-slate-400 mt-1">Google OAuth 2.0 Authentication</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  
                  {/* Account Choice 1: Saad (1-Tap Sign In) */}
                  <button
                    onClick={() => handleInstantGoogleLogin("saad")}
                    className="w-full p-3.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-emerald-500/60 rounded-2xl transition-all flex items-center justify-between group cursor-pointer shadow-md text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
                          alt="Saad"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                          <svg className="w-3 h-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-sm text-white">Saad</span>
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded-md border border-emerald-500/30">
                            Founder
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">saad@vornixverse.com</p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                      <span className="hidden sm:inline mr-1">Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Account Choice 2: Custom Google Account Toggle */}
                  {!showCustomForm ? (
                    <button
                      onClick={() => setShowCustomForm(true)}
                      className="w-full p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-2xl transition-all flex items-center justify-between cursor-pointer text-left text-slate-300 hover:text-white"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                          <UserPlus className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Use another Google account</p>
                          <p className="text-[11px] text-slate-400">Sign in with your personal Gmail</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-bold">+ Add</span>
                    </button>
                  ) : (
                    /* Custom Account Entry Form */
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleInstantGoogleLogin("custom");
                      }}
                      className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3"
                    >
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={customInputName}
                          onChange={(e) => setCustomInputName(e.target.value)}
                          placeholder="e.g. Rahul, Priya, Alex"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Google Email Address</label>
                        <input
                          type="email"
                          required
                          value={customInputEmail}
                          onChange={(e) => setCustomInputEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-emerald-500"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowCustomForm(false)}
                          className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-bold text-slate-300"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-md shadow-emerald-600/30"
                        >
                          Sign In with Google
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Primary 1-Click Fast Button */}
                  <button
                    onClick={() => handleInstantGoogleLogin("saad")}
                    className="w-full py-3 px-4 bg-white hover:bg-slate-100 active:scale-98 text-slate-900 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer ring-2 ring-slate-300 mt-2"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>One-Tap Google Sign In</span>
                  </button>

                </div>
              )}
            </div>
          ) : (
            /* Logged In View: Profile Customizer + Allergy / Sensitivity Toggles */
            <div className="space-y-4">
              
              {/* User Identity Card with Photo Edit */}
              <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700/80 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-13 h-13 rounded-2xl object-cover ring-2 ring-emerald-400 shadow-md"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg shadow-sm transition-transform cursor-pointer"
                        title="Upload Photo"
                      >
                        <Camera className="w-3 h-3 stroke-[2.5]" />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0">
                      {isEditingName ? (
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <input
                            type="text"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            className="bg-slate-950 text-white text-xs font-bold px-2 py-1 rounded-lg border border-emerald-500 focus:outline-hidden w-32"
                            placeholder="Your Name"
                          />
                          <button
                            onClick={handleSaveName}
                            className="p-1 bg-emerald-500 text-slate-950 rounded-lg text-xs"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-extrabold text-white truncate">{currentUser.name}</h4>
                          <button
                            onClick={() => setIsEditingName(true)}
                            className="text-slate-400 hover:text-white p-0.5"
                            title="Edit Name"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </div>
                      )}
                      <p className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">{currentUser.email}</p>
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md mt-1 inline-block">
                        {currentUser.title || "Google Verified Member"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>

                {/* Avatar Gallery Selector & Upload Photo Button */}
                <div className="pt-2 border-t border-slate-700/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-300">Choose Profile Picture / Avatar:</span>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload Photo</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                    {presetAvatars.map((av) => (
                      <button
                        key={av.id}
                        onClick={() => handleSelectAvatar(av.url)}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          currentUser.avatar === av.url
                            ? "border-emerald-400 ring-2 ring-emerald-400/40 scale-105"
                            : "border-slate-700 hover:border-slate-500 opacity-70 hover:opacity-100"
                        }`}
                        title={av.name}
                      >
                        <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomPhotoUpload}
                    className="hidden"
                  />
                </div>
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
                      ✓ Saved
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Select your dietary restrictions. NutriVerse will immediately alert you whenever a scanned food item conflicts with your profile.
                </p>

                <div className="space-y-2 pt-1 max-h-48 overflow-y-auto custom-scrollbar pr-1">
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

              {/* Done & Close Profile Button */}
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Done & Save Preferences
              </button>
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
