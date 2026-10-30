import React, { useState, useEffect } from "react";
import LuxuryHeader from "./components/navigation/LuxuryHeader";
import LuxuryBottomNav from "./components/navigation/LuxuryBottomNav";
import ScanScreen from "./components/screens/ScanScreen";
import ProductDetailScreen from "./components/screens/ProductDetailScreen";
import HealthInspectorScreen from "./components/screens/HealthInspectorScreen";
import CalorieCalculatorScreen from "./components/screens/CalorieCalculatorScreen";
import DealsHubScreen from "./components/screens/DealsHubScreen";
import StoreVsOnlineScreen from "./components/screens/StoreVsOnlineScreen";
import ComparisonScreen from "./components/screens/ComparisonScreen";
import CustomerSupportScreen from "./components/screens/CustomerSupportScreen";
import HistoryFavoritesScreen from "./components/screens/HistoryFavoritesScreen";
import GoogleLoginModal from "./components/auth/GoogleLoginModal";
import BarcodeScannerModal from "./components/BarcodeScannerModal";
import OcrVerificationModal from "./components/OcrVerificationModal";
import DisclaimerBanner from "./components/DisclaimerBanner";
import { translations } from "./i18n/translations";
import { languages } from "./components/Navbar";
import { sampleProducts } from "./data/sampleProducts";
import { fetchProductByBarcode } from "./services/openFoodFacts";
import { getCurrentUser, addToScanHistory } from "./services/authService";
import { AlertCircle, Sparkles } from "lucide-react";

export default function App() {
  // 1. Language state (defaults to English as primary language)
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("scaniq_lang_v2") || "en";
  });

  const t = translations[currentLang] || translations.en;
  const isMalayalam = currentLang === "ml";

  // Active Tab: "scan" | "health" | "calorie" | "compare" | "history" | "deals" | "storeVsOnline" | "support"
  const [currentTab, setCurrentTab] = useState("scan");

  // Selected product for full intelligence card view (when on scan tab)
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);

  // User auth state
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Update HTML document direction and lang
  useEffect(() => {
    localStorage.setItem("scaniq_lang_v2", currentLang);
    const activeLangConfig = languages.find((l) => l.code === currentLang);
    document.documentElement.dir = activeLangConfig?.dir || "ltr";
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener("scaniq_auth_change", handleAuthChange);
    return () => window.removeEventListener("scaniq_auth_change", handleAuthChange);
  }, []);

  // 2. Products state
  const [productsList, setProductsList] = useState(sampleProducts);

  // Active product for single-item views (Health, Deals, Store vs Online)
  const [activeProduct, setActiveProduct] = useState(sampleProducts[0]); // Britannia NutriChoice

  // Comparison slots for Comparison Screen
  const [slot1, setSlot1] = useState(sampleProducts[0]); // Britannia NutriChoice
  const [slot2, setSlot2] = useState(sampleProducts[1]); // Britannia Good Day

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isOcrOpen, setIsOcrOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Barcode Scan Success Handler - Immediately opens full product detail card!
  const handleScanSuccess = async (barcode) => {
    showNotification(`Scanning barcode: ${barcode}...`, "info");
    const result = await fetchProductByBarcode(barcode);
    if (result.success) {
      const foundProduct = result.product;
      setProductsList((prev) => {
        if (!prev.find((p) => p.barcode === foundProduct.barcode)) {
          return [foundProduct, ...prev];
        }
        return prev;
      });

      setActiveProduct(foundProduct);
      setSelectedProductForDetail(foundProduct);
      setCurrentTab("scan");
      addToScanHistory(foundProduct);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // If user was comparing, slot it in
      if (currentTab === "compare") {
        if (!slot1) setSlot1(foundProduct);
        else setSlot2(foundProduct);
      }

      showNotification(`Loaded: ${foundProduct.name}`, "success");
    } else {
      showNotification(t.common.notAvailable, "error");
    }
  };

  // OCR Verification Handler
  const handleVerifiedProduct = (newProduct) => {
    setProductsList((prev) => [newProduct, ...prev]);
    setActiveProduct(newProduct);
    setSelectedProductForDetail(newProduct);
    setCurrentTab("scan");
    addToScanHistory(newProduct);
    showNotification(`Verified and saved: ${newProduct.name}`, "success");
  };

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors selection:bg-emerald-500 selection:text-white">
      {/* 1. Top Luxury Header with Logo, Tabs & Google Profile */}
      <LuxuryHeader
        currentTab={currentTab}
        onTabChange={handleTabChange}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        t={t}
      />

      {/* Toast Notification Alert */}
      {notification && (
        <div className="fixed top-20 right-5 z-50 animate-slideIn">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl border text-xs sm:text-sm font-bold flex items-center gap-2 backdrop-blur-md ${
              notification.type === "error"
                ? "bg-rose-950/90 text-rose-200 border-rose-800"
                : notification.type === "info"
                ? "bg-sky-950/90 text-sky-200 border-sky-800"
                : "bg-emerald-950/90 text-emerald-200 border-emerald-800"
            }`}
          >
            {notification.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-400" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* 2. Main Content Canvas */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full bg-slate-50 text-slate-900 rounded-t-3xl min-h-[85vh] shadow-2xl">
        {/* Tab 1: Scan & Explore / Hero or Full Product Detail */}
        {currentTab === "scan" && (
          selectedProductForDetail ? (
            <ProductDetailScreen
              product={selectedProductForDetail}
              onBack={() => setSelectedProductForDetail(null)}
              onSetSlot1={(p) => {
                setSlot1(p);
                showNotification(`Added ${p.name} to Slot 1`, "success");
              }}
              onSetSlot2={(p) => {
                setSlot2(p);
                showNotification(`Added ${p.name} to Slot 2`, "success");
              }}
              onOpenHealthInspector={(p) => {
                setActiveProduct(p);
                setCurrentTab("health");
              }}
              onOpenCalorieCalculator={(p) => {
                setActiveProduct(p);
                setCurrentTab("calorie");
              }}
              onSelectAlternative={(altProduct) => {
                setSelectedProductForDetail(altProduct);
                setActiveProduct(altProduct);
                addToScanHistory(altProduct);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              isMalayalam={isMalayalam}
              t={t}
            />
          ) : (
            <ScanScreen
              productsList={productsList}
              onSelectProduct={(p) => {
                setSelectedProductForDetail(p);
                setActiveProduct(p);
                addToScanHistory(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenOcr={() => setIsOcrOpen(true)}
              onQuickScanBarcode={handleScanSuccess}
              onSetSlot1={(p) => {
                setSlot1(p);
                showNotification(`Added ${p.name} to Slot 1`, "success");
              }}
              onSetSlot2={(p) => {
                setSlot2(p);
                showNotification(`Added ${p.name} to Slot 2`, "success");
              }}
              isMalayalam={isMalayalam}
              t={t}
            />
          )
        )}

        {/* Tab 2: Food Health Inspector (Food-only Nuanced Inspector) */}
        {currentTab === "health" && (
          <HealthInspectorScreen
            activeProduct={activeProduct}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenOcr={() => setIsOcrOpen(true)}
            onSelectProduct={setActiveProduct}
            productsList={productsList}
            isMalayalam={isMalayalam}
            t={t}
          />
        )}

        {/* Tab 3: Calorie IQ & Portion Calculator */}
        {currentTab === "calorie" && (
          <CalorieCalculatorScreen
            activeProduct={activeProduct}
            productsList={productsList}
            onSelectProduct={setActiveProduct}
            onOpenScanner={() => setIsScannerOpen(true)}
            isMalayalam={isMalayalam}
            t={t}
          />
        )}

        {/* Tab 4: Head-to-Head & True Value Comparison */}
        {currentTab === "compare" && (
          <ComparisonScreen
            slot1={slot1}
            slot2={slot2}
            onSetSlot1={setSlot1}
            onSetSlot2={setSlot2}
            onSwapSlots={() => {
              const temp = slot1;
              setSlot1(slot2);
              setSlot2(temp);
            }}
            onClearSlot1={() => setSlot1(null)}
            onClearSlot2={() => setSlot2(null)}
            productsList={productsList}
            isMalayalam={isMalayalam}
            t={t}
          />
        )}

        {/* Tab 5: Personal Scan History & Saved Favorites */}
        {currentTab === "history" && (
          <HistoryFavoritesScreen
            onSelectProduct={(p) => {
              setSelectedProductForDetail(p);
              setActiveProduct(p);
              setCurrentTab("scan");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            isMalayalam={isMalayalam}
            t={t}
          />
        )}

        {/* Tab 6: Live Deals Hub */}
        {currentTab === "deals" && (
          <DealsHubScreen
            activeProduct={activeProduct}
            productsList={productsList}
            onSelectProduct={setActiveProduct}
            isMalayalam={isMalayalam}
            t={t}
          />
        )}

        {/* Tab 7: Physical In-Store vs Online Price Checker */}
        {currentTab === "storeVsOnline" && (
          <StoreVsOnlineScreen
            activeProduct={activeProduct}
            productsList={productsList}
            onSelectProduct={setActiveProduct}
            onOpenScanner={() => setIsScannerOpen(true)}
            isMalayalam={isMalayalam}
            t={t}
          />
        )}

        {/* Tab 8: Customer Support & Guarded AI Assistant */}
        {currentTab === "support" && (
          <CustomerSupportScreen
            activeProduct={activeProduct}
            currentLang={currentLang}
            onLanguageChange={setCurrentLang}
            isMalayalam={isMalayalam}
            t={t}
          />
        )}
      </main>

      {/* 3. Barcode Scanner Modal with Live Camera & Voice Input */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        t={t}
      />

      {/* 4. OCR Label Verification Modal */}
      <OcrVerificationModal
        isOpen={isOcrOpen}
        onClose={() => setIsOcrOpen(false)}
        onVerifiedProduct={handleVerifiedProduct}
        t={t}
      />

      {/* 5. Google Login & Dietary Shield Modal */}
      <GoogleLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        t={t}
      />

      {/* 6. Mobile Floating Bottom Navigation */}
      <LuxuryBottomNav
        currentTab={currentTab}
        onTabChange={handleTabChange}
        t={t}
      />

      {/* 7. Medical & Transparency Disclaimer Footer */}
      <DisclaimerBanner t={t} />
    </div>
  );
}
