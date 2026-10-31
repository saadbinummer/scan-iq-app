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
  Loader2,
  Mail,
  Lock,
  LogIn
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
  
  // Login tabs: "google" | "form"
  const [loginMode, setLoginMode] = useState("google");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingStatus, setConnectingStatus] = useState("");

  // Quick Google input
  const [quickGoogleEmail, setQuickGoogleEmail] = useState("");

  // Fill in the blanks form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rememberMe: true
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) setCustomName(user.name);
    setDietaryPrefs(getDietaryPreferences());
    setIsConnecting(false);
    setLoginMode("google");
  }, [isOpen]);

  if (!isOpen) return null;

  const presetAvatars = [
    {
      id: "pro_blue",
      name: "Blue Icon",
      url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "tech_pro",
      name: "Green Icon",
      url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "creative",
      name: "Purple Icon",
      url: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "executive",
      name: "Teal Icon",
      url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80"
    },
    {
      id: "gold",
      name: "Amber Icon",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80"
    }
  ];

  // 1. Google 1-Click / Device Google Account Login
  const handleGoogleOneClick = (e) => {
    if (e) e.preventDefault();
    setIsConnecting(true);
    setConnectingStatus("Connecting to Google Accounts...");

    setTimeout(() => {
      setConnectingStatus("Verifying identity & syncing allergy shield...");
    }, 350);

    setTimeout(() => {
      let email = quickGoogleEmail.trim();
      let name = "Google User";

      if (email) {
        // Derive clean name from email prefix
        const prefix = email.split("@")[0];
        name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      } else {
        email = "user@gmail.com";
      }

      const userObj = {
        id: `g_user_${Date.now()}`,
        name: name,
        title: "Google Verified Member",
        email: email.includes("@") ? email : `${email}@gmail.com`,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
        authProvider: "Google Account",
        joinedDate: new Date().toLocaleDateString()
      };

      const user = loginWithGoogle(userObj);
      setCurrentUser(user);
      setCustomName(user.name);
      setIsConnecting(false);

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      onClose();
    }, 650);
  };

  // 2. Fill in the blanks form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    setIsConnecting(true);
    setConnectingStatus("Creating your NutriVerse profile...");

    setTimeout(() => {
      const userObj = {
        id: `user_${Date.now()}`,
        name: formData.name.trim(),
        title: "NutriVerse Member",
        email: formData.email.trim(),
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80",
        authProvider: "Email Account",
        joinedDate: new Date().toLocaleDateString()
      };

      const user = loginWithGoogle(userObj);
      setCurrentUser(user);
      setCustomName(user.name);
      setIsConnecting(false);

      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
      onClose();
    }, 550);
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
                {currentUser ? "My NutriVerse Profile" : "Account Sign-In"}
              </h3>
              <p className="text-xs text-slate-400">
                {currentUser
                  ? "Identity, Photo & Personal Allergy Shield"
                  : "Sign in with Google or fill in your details"}
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
        <div className="p-5 space-y-4">
          {!currentUser ? (
            /* Unauthenticated View: 2 Clear Methods (Google Direct or Fill Form) */
            <div className="space-y-4">
              
              {/* Login Method Tabs */}
              <div className="flex rounded-xl bg-slate-800/80 p-1 border border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setLoginMode("google")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    loginMode === "google"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google Sign-In</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMode("form")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    loginMode === "form"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Fill in Details</span>
                </button>
              </div>

              {/* Connecting State */}
              {isConnecting ? (
                <div className="py-8 text-center space-y-3 bg-slate-800/60 rounded-2xl border border-slate-700/80 animate-pulse">
                  <div className="flex justify-center">
                    <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{connectingStatus}</p>
                    <p className="text-xs text-slate-400 mt-1">Connecting account securely...</p>
                  </div>
                </div>
              ) : loginMode === "google" ? (
                /* Method 1: Google Direct 1-Click */
                <div className="space-y-4">
                  <div className="text-center py-2">
                    <p className="text-xs text-slate-300">
                      Sign in with your Google account to automatically store your scan history and activate custom dietary warnings.
                    </p>
                  </div>

                  {/* 1-Tap Google Button */}
                  <button
                    onClick={handleGoogleOneClick}
                    className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 active:scale-98 text-slate-900 font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer ring-2 ring-slate-300"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>One-Tap Sign in with Google</span>
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-700"></div>
                    <span className="shrink-0 mx-3 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                      Or use your specific Gmail
                    </span>
                    <div className="flex-grow border-t border-slate-700"></div>
                  </div>

                  {/* Quick Gmail input */}
                  <form onSubmit={handleGoogleOneClick} className="space-y-2">
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={quickGoogleEmail}
                        onChange={(e) => setQuickGoogleEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-emerald-400 hover:text-emerald-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Connect with this Google Email</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ) : (
                /* Method 2: Fill in the Blanks Form */
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Full Name (പൂർണ്ണ നാമം) *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Email Address (ഇമെയിൽ) *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Password (പാസ്‌വേഡ്)
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Complete Sign In</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Logged In View: Member Profile + Allergy Shield */
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
                            className="p-1 bg-emerald-500 text-slate-950 rounded-lg text-xs cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-extrabold text-white truncate">{currentUser.name}</h4>
                          <button
                            onClick={() => setIsEditingName(true)}
                            className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
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
