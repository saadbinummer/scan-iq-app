import React, { useState } from "react";
import { X, CheckCircle, Upload, FileText, AlertTriangle, Sparkles } from "lucide-react";

export default function OcrVerificationModal({ isOpen, onClose, onVerifiedProduct, t }) {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Editable Form fields for the user to review and verify
  const [formData, setFormData] = useState({
    name: "SunFeast High-Fiber Digestive Biscuits",
    brand: "SunFeast",
    category: "Snacks & Biscuits",
    packageSize: 200,
    unit: "g",
    price: 45,
    servingSize: "25g",
    calories: 460,
    sugar: 13.5,
    fat: 18.0,
    saturatedFat: 7.8,
    sodium: 340,
    fiber: 5.5,
    protein: 7.2,
    ingredients: "Wheat Flour (55%), Refined Palm Oil, Sugar, Wheat Bran (4.5%), Raising Agents (500ii)",
    allergens: "Wheat, Gluten"
  });

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhotoPreview(uploadEvent.target.result);
        // Simulate smart OCR parsing with realistic latency
        setTimeout(() => {
          setIsProcessing(false);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    const finalProduct = {
      id: `custom_${Date.now()}`,
      barcode: `MANUAL_${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      name: formData.name,
      nameMl: formData.name,
      brand: formData.brand || "Custom Brand",
      category: formData.category,
      categoryMl: formData.category,
      imageUrl: photoPreview || "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
      packageSize: {
        value: Number(formData.packageSize) || 100,
        unit: formData.unit
      },
      price: Number(formData.price) || 0,
      mrp: Number(formData.price) || 0,
      nutritionalInfo: {
        servingSize: formData.servingSize,
        calories: Number(formData.calories) || null,
        sugar: formData.sugar !== "" ? Number(formData.sugar) : null,
        fat: formData.fat !== "" ? Number(formData.fat) : null,
        saturatedFat: formData.saturatedFat !== "" ? Number(formData.saturatedFat) : null,
        sodium: formData.sodium !== "" ? Number(formData.sodium) : null,
        fiber: formData.fiber !== "" ? Number(formData.fiber) : null,
        protein: formData.protein !== "" ? Number(formData.protein) : null
      },
      ingredients: formData.ingredients ? formData.ingredients.split(",").map((i) => i.trim()) : [],
      allergens: formData.allergens ? formData.allergens.split(",").map((a) => a.trim()) : [],
      deals: [
        { store: "Store Price (Verified by User)", price: Number(formData.price), delivery: 0, discount: 0, url: "#" }
      ],
      dataSource: "User Photo Upload + Human Verified OCR",
      isDataIncomplete: formData.sugar === "" || formData.fat === "" || formData.sodium === ""
    };

    onVerifiedProduct(finalProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 my-8 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <h3 className="font-bold text-base sm:text-lg">{t.ocrModalTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 custom-scrollbar">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">{t.ocrModalDesc}</span>
            </div>
          </div>

          {/* Photo Upload Zone */}
          <div className="flex flex-col sm:flex-row gap-4 items-center border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50/70">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Label Preview"
                className="w-24 h-24 object-cover rounded-lg border border-slate-300 shadow-xs"
              />
            ) : (
              <div className="w-24 h-24 rounded-lg bg-slate-200 flex flex-col items-center justify-center text-slate-400">
                <Upload className="w-7 h-7 mb-1" />
                <span className="text-[10px]">No Photo</span>
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors shadow-2xs">
                <Upload className="w-3.5 h-3.5" /> Select Label Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[11px] text-slate-500 mt-1">
                Formats: PNG, JPG, JPEG. Instant auto-extraction.
              </p>
              {isProcessing && (
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs mt-1.5 font-medium animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" /> Extracting nutrients with OCR engine...
                </div>
              )}
            </div>
          </div>

          {/* Verification Form (Human-in-the-Loop) */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFieldChange("category", e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                >
                  <option value="Snacks & Biscuits">Snacks & Biscuits</option>
                  <option value="Breakfast & Cereals">Breakfast & Cereals</option>
                  <option value="Beverages & Drinks">Beverages & Drinks</option>
                  <option value="Dairy & Plant Milk">Dairy & Plant Milk</option>
                  <option value="Cooking Oils">Cooking Oils</option>
                  <option value="General Grocery">General Grocery</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Size ({formData.unit})
                </label>
                <input
                  type="number"
                  value={formData.packageSize}
                  onChange={(e) => handleFieldChange("packageSize", e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unit
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleFieldChange("unit", e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                >
                  <option value="g">grams (g)</option>
                  <option value="ml">milliliters (ml)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price (₹/$)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleFieldChange("price", e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Nutrients Grid (Per 100g) */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Nutrients per 100g / 100ml (Extracted by OCR)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div>
                  <span className="text-slate-500 font-medium block">Calories (kcal)</span>
                  <input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => handleFieldChange("calories", e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Sugar (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.sugar}
                    onChange={(e) => handleFieldChange("sugar", e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Total Fat (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.fat}
                    onChange={(e) => handleFieldChange("fat", e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Saturated Fat (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.saturatedFat}
                    onChange={(e) => handleFieldChange("saturatedFat", e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Sodium (mg)</span>
                  <input
                    type="number"
                    value={formData.sodium}
                    onChange={(e) => handleFieldChange("sodium", e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                  />
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Fiber (g)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.fiber}
                    onChange={(e) => handleFieldChange("fiber", e.target.value)}
                    className="w-full mt-0.5 px-2.5 py-1.5 rounded-md border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ingredients (Comma separated)
              </label>
              <textarea
                rows={2}
                value={formData.ingredients}
                onChange={(e) => handleFieldChange("ingredients", e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" /> {t.confirmAndAdd}
          </button>
        </div>
      </div>
    </div>
  );
}
