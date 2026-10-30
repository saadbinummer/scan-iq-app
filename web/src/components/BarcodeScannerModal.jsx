import React, { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  X,
  Camera,
  RefreshCw,
  Upload,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ScanLine,
  ArrowRight,
  ShieldCheck,
  Zap,
  Mic,
  MicOff
} from "lucide-react";

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess, t }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [camerasList, setCamerasList] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [manualCode, setManualCode] = useState("");
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);

  const startVoiceInput = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Voice search not supported on this browser.");
      return;
    }
    try {
      const rec = new SpeechRec();
      rec.lang = "en-IN";
      rec.continuous = false;
      rec.onstart = () => setIsVoiceListening(true);
      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        if (text) {
          const numbersOnly = text.replace(/\D/g, "");
          if (numbersOnly.length >= 8) {
            handleBarcodeFound(numbersOnly);
          } else {
            setManualCode(text);
          }
        }
      };
      rec.onerror = () => setIsVoiceListening(false);
      rec.onend = () => setIsVoiceListening(false);
      rec.start();
    } catch {
      setIsVoiceListening(false);
    }
  };

  // Synthesized scan beep feedback
  const playScanBeep = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // Audio autoplay policy
    }
    if (navigator.vibrate) {
      navigator.vibrate([60, 40, 60]);
    }
  }, []);

  const handleBarcodeFound = useCallback((barcode) => {
    playScanBeep();
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }
    onScanSuccess(barcode);
    onClose();
  }, [onClose, onScanSuccess, playScanBeep]);

  // Start Camera with multi-camera fallback
  const startCamera = useCallback(async (cameraId = null) => {
    setErrorMsg("");
    setIsScanning(false);

    try {
      const scannerId = "interactive-barcode-reader";
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(scannerId);
      }
      const scanner = scannerRef.current;

      if (scanner.isScanning) {
        await scanner.stop();
      }

      // Enumerate cameras
      let cameras = camerasList;
      if (cameras.length === 0) {
        try {
          cameras = await Html5Qrcode.getCameras();
          setCamerasList(cameras || []);
        } catch (camErr) {
          console.warn("Could not list cameras:", camErr);
        }
      }

      const qrConfig = {
        fps: 15,
        qrbox: { width: 280, height: 160 },
        aspectRatio: 1.333334
      };

      if (cameraId) {
        await scanner.start(cameraId, qrConfig, handleBarcodeFound, () => {});
      } else if (cameras && cameras.length > 0) {
        // Prefer back camera if available, otherwise first camera (laptop/webcam)
        const backCamera = cameras.find(
          (c) =>
            c.label?.toLowerCase().includes("back") ||
            c.label?.toLowerCase().includes("rear") ||
            c.label?.toLowerCase().includes("environment")
        ) || cameras[cameras.length - 1];

        await scanner.start(backCamera.id, qrConfig, handleBarcodeFound, () => {});
      } else {
        // Fallback: try environment then user mode
        try {
          await scanner.start({ facingMode: "environment" }, qrConfig, handleBarcodeFound, () => {});
        } catch {
          await scanner.start({ facingMode: "user" }, qrConfig, handleBarcodeFound, () => {});
        }
      }

      setIsScanning(true);
    } catch (err) {
      console.warn("Camera start error:", err);
      setIsScanning(false);
      setErrorMsg("Camera live preview unavailable on this device/browser. You can still scan by uploading an image or selecting any item below!");
    }
  }, [camerasList, handleBarcodeFound]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        startCamera();
      }, 250);

      return () => {
        clearTimeout(timer);
        if (scannerRef.current) {
          try {
            if (scannerRef.current.isScanning) {
              scannerRef.current.stop().catch(() => {});
            }
          } catch {
            // ignore
          }
        }
      };
    }
  }, [isOpen, startCamera]);

  // Flip / switch camera
  const handleSwitchCamera = async () => {
    if (camerasList.length > 1) {
      const nextIndex = (currentCameraIndex + 1) % camerasList.length;
      setCurrentCameraIndex(nextIndex);
      await startCamera(camerasList[nextIndex].id);
    } else {
      await startCamera();
    }
  };

  // Upload image to scan
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    setErrorMsg("");
    try {
      let scanner = scannerRef.current;
      if (!scanner) {
        scanner = new Html5Qrcode("interactive-barcode-reader");
        scannerRef.current = scanner;
      }
      const decodedText = await scanner.scanFile(file, true);
      setIsProcessingFile(false);
      handleBarcodeFound(decodedText);
    } catch (err) {
      setIsProcessingFile(false);
      setErrorMsg("No barcode found in that image. Please ensure the barcode is clearly visible and try again.");
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const clean = manualCode.trim();
    if (clean) {
      handleBarcodeFound(clean);
    }
  };

  if (!isOpen) return null;

  const popularFoodBarcodes = [
    { name: "Maggi Masala Noodles", code: "8901058852448", brand: "Nestle", badge: "Instant Noodles" },
    { name: "Amul Butter 100g", code: "8901262010054", brand: "Amul", badge: "Dairy" },
    { name: "NutriChoice Oats Cookies", code: "8901030382345", brand: "Britannia", badge: "High Fiber" },
    { name: "Lay's Magic Masala Chips", code: "8901491101837", brand: "Lay's", badge: "Snacks" },
    { name: "Cadbury Dairy Milk", code: "8901233024844", brand: "Cadbury", badge: "Chocolate" },
    { name: "Quaker Rolled Oats 1kg", code: "8901499008544", brand: "Quaker", badge: "Wholegrain" },
    { name: "Slice Mango Drink 600ml", code: "8901725181155", brand: "Slice", badge: "Beverage" },
    { name: "Aashirvaad Atta 5kg", code: "8901725121341", brand: "ITC", badge: "Whole Wheat" },
    { name: "Coca-Cola 330ml Can", code: "8901764012210", brand: "Coke", badge: "Soft Drink" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base sm:text-lg flex items-center gap-1.5">
                <span>NutriVerse Barcode & Nutrition Engine</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                  LIVE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Point camera or select food product for instant calorie & health analysis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Canvas */}
        <div className="p-4 sm:p-6 flex flex-col items-center">
          <div className="relative w-full max-w-[340px] h-[220px] bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center group">
            
            {/* Html5Qrcode video mounting element */}
            <div
              id="interactive-barcode-reader"
              className="w-full h-full object-cover flex items-center justify-center"
            />

            {/* Futuristic Targeting Reticle & Glowing Laser */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
              {/* Corner brackets */}
              <div className="flex justify-between w-full">
                <div className="w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <div className="w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </div>

              {/* Center animated laser line */}
              <div className="relative w-full h-0.5">
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-laser" />
              </div>

              <div className="flex justify-between w-full">
                <div className="w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <div className="w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-lg shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </div>
            </div>

            {/* Error or Fallback Message if camera unavailable */}
            {!isScanning && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                <AlertCircle className="w-8 h-8 text-amber-400 mb-2 animate-pulse" />
                <p className="text-xs font-semibold text-slate-200 mb-1">
                  {errorMsg || "Initializing camera stream..."}
                </p>
                <button
                  onClick={() => startCamera()}
                  className="mt-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retry Camera
                </button>
              </div>
            )}
          </div>

          {/* Camera Controls & File Upload */}
          <div className="flex items-center justify-center gap-2 mt-3 w-full">
            {camerasList.length > 1 && (
              <button
                onClick={handleSwitchCamera}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Switch Camera</span>
              </button>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessingFile}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-teal-400" />
              <span>{isProcessingFile ? "Scanning..." : "Upload Photo"}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Manual Barcode & Voice Search Form */}
          <form onSubmit={handleManualSubmit} className="mt-4 w-full">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Enter barcode or speak (e.g. 8901058852448)..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 font-mono transition-colors"
                />
                <button
                  type="button"
                  onClick={startVoiceInput}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all cursor-pointer ${
                    isVoiceListening ? "bg-rose-500 text-white animate-pulse" : "text-slate-400 hover:text-emerald-400"
                  }`}
                  title="Speak Barcode or Product Name"
                >
                  {isVoiceListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={!manualCode.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-40 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Inspect Food</span>
              </button>
            </div>
          </form>

          {/* Quick-Scan Food Grid (Instant Realistic Test) */}
          <div className="mt-5 w-full bg-slate-950/70 rounded-2xl p-3 sm:p-4 border border-slate-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant 1-Click Food Barcodes:</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">100% Realistic Data</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
              {popularFoodBarcodes.map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleBarcodeFound(item.code)}
                  className="p-2 bg-slate-900/90 hover:bg-emerald-950/60 hover:border-emerald-500/60 border border-slate-800 rounded-xl text-left transition-all group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {item.name}
                    </div>
                    <div className="text-[9px] text-slate-400 flex items-center justify-between mt-0.5">
                      <span>{item.brand}</span>
                      <span className="text-emerald-400 font-mono">{item.code.slice(-5)}</span>
                    </div>
                  </div>
                  <div className="mt-1.5 text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm inline-block w-fit">
                    {item.badge}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px] flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Nuanced Food Evaluation & Calorie Engine</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold transition-colors cursor-pointer"
          >
            {t.common?.close || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}