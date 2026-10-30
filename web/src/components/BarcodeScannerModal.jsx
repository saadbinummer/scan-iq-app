import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X, Camera, AlertCircle, Sparkles } from "lucide-react";

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess, t }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    let html5QrCode = null;

    if (isOpen) {
      setErrorMsg("");
      const scannerId = "interactive-barcode-reader";

      // Give DOM time to mount reader div
      const timer = setTimeout(async () => {
        try {
          html5QrCode = new Html5Qrcode(scannerId);
          scannerRef.current = html5QrCode;

          const qrConfig = { fps: 10, qrbox: { width: 250, height: 180 } };
          await html5QrCode.start(
            { facingMode: "environment" },
            qrConfig,
            (decodedText) => {
              // Barcode scanned!
              if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode.stop().then(() => {
                  onScanSuccess(decodedText);
                  onClose();
                });
              }
            },
            () => {
              // Ignore frames with no barcode
            }
          );
          setIsScanning(true);
        } catch (err) {
          console.warn("Camera start failed:", err);
          setErrorMsg("Camera access not available or blocked in this environment. You can test with the sample barcodes below.");
          setIsScanning(false);
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        if (scannerRef.current) {
          try {
            if (scannerRef.current.isScanning) {
              scannerRef.current.stop().catch(() => {});
            }
          } catch {
            // ignore cleanup errors
          }
        }
      };
    }
  }, [isOpen, onClose, onScanSuccess]);

  if (!isOpen) return null;

  const sampleBarcodes = [
    { name: "📱 iPhone 15", code: "195949012345" },
    { name: "🤖 Galaxy S24", code: "8806091876543" },
    { name: "🥣 Quaker Oats", code: "8901499008544" },
    { name: "🍪 Britannia NutriChoice", code: "8901030382345" },
    { name: "💻 MacBook Air M2", code: "194253789012" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-base">
              {t.scanBtn || "Scan Barcode"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Viewport */}
        <div className="p-5 flex flex-col items-center">
          <p className="text-xs text-slate-500 mb-3 text-center">
            Point camera at food or electronic product barcode to instantly load full intelligence.
          </p>

          <div
            id="interactive-barcode-reader"
            className="w-full max-w-[320px] h-[240px] bg-slate-950 rounded-xl overflow-hidden relative flex items-center justify-center border-2 border-dashed border-emerald-500 shadow-inner"
          >
            {!isScanning && (
              <div className="text-center p-4 text-slate-400 text-xs">
                {errorMsg ? (
                  <span className="text-amber-400 flex flex-col items-center gap-1">
                    <AlertCircle className="w-6 h-6 text-amber-400" />
                    {errorMsg}
                  </span>
                ) : (
                  <span>Initializing camera...</span>
                )}
              </div>
            )}
          </div>

          {/* Quick simulator buttons */}
          <div className="mt-4 w-full bg-emerald-50/60 rounded-xl p-3 border border-emerald-100">
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Quick Barcode Demos (Instant Test):
            </div>
            <div className="flex flex-wrap gap-2">
              {sampleBarcodes.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    onScanSuccess(item.code);
                    onClose();
                  }}
                  className="text-xs bg-white hover:bg-emerald-600 hover:text-white text-slate-700 font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {t.common?.close || "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
