import React from "react";

export default function NutriVerseLogo({ className = "w-10 h-10" }) {
  return (
    <div className={`relative ${className} shrink-0 group-hover:scale-105 transition-transform duration-300`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="nvEmblemBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#022c22" />
            <stop offset="50%" stop-color="#020617" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
          <linearGradient id="nvEmblemEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#34d399" />
            <stop offset="50%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#059669" />
          </linearGradient>
          <linearGradient id="nvEmblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24" />
            <stop offset="50%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
          <filter id="nvEmblemGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Squircle container with glowing border */}
        <rect width="100" height="100" rx="26" fill="url(#nvEmblemBg)" />
        <rect x="2" y="2" width="96" height="96" rx="24" stroke="url(#nvEmblemEmerald)" stroke-width="2.5" stroke-opacity="0.8" />

        {/* Orbit Ring representing the vornixverse Universe */}
        <ellipse
          cx="50"
          cy="50"
          rx="36"
          ry="14"
          transform="rotate(-30 50 50)"
          stroke="url(#nvEmblemGold)"
          stroke-width="3"
          stroke-dasharray="4 2"
          stroke-opacity="0.9"
        />

        {/* Orbiting Satellite Star */}
        <circle cx="21" cy="34" r="4" fill="#fbbf24" filter="url(#nvEmblemGlow)" />

        {/* Central Vitality & Nutrition Leaf */}
        <path
          d="M50 22 C34 22 28 38 28 52 C28 66 38 76 50 78 C62 76 72 66 72 52 C72 38 66 22 50 22 Z"
          fill="url(#nvEmblemEmerald)"
        />

        {/* Life Vein & Neural Branches */}
        <path d="M50 26 L50 74" stroke="#ecfdf5" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.9" />
        <path d="M50 40 L40 33" stroke="#ecfdf5" stroke-width="2" stroke-linecap="round" stroke-opacity="0.8" />
        <path d="M50 50 L60 43" stroke="#ecfdf5" stroke-width="2" stroke-linecap="round" stroke-opacity="0.8" />
        <path d="M50 60 L42 54" stroke="#ecfdf5" stroke-width="2" stroke-linecap="round" stroke-opacity="0.8" />

        {/* Core Luminous Star */}
        <circle cx="50" cy="50" r="4.5" fill="#ffffff" filter="url(#nvEmblemGlow)" />
      </svg>
    </div>
  );
}
