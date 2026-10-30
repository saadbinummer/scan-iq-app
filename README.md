# 🌿 NutriVerse — Universal Food Intelligence & Health Platform
> **Powered by vornixverse • Created by Saad**

NutriVerse is an intelligent product scanner, nuanced food health inspector, calorie calculator, and universal multi-store price comparison platform. Part of the **vornixverse** ecosystem, created by **Saad**.

---

## 📁 Repository Architecture (4 Dedicated Project Folders)

```
CompareAnything/
├── android/          # 📱 Android Mobile Native Wrapper (Capacitor/Gradle project)
├── backend/          # ⚙️ Node.js + Express API Backend Server (Port 5001)
├── ios/              # 🍎 iOS Mobile Native Wrapper (Capacitor/Xcode project)
├── web/              # 🌐 React 19 + Vite 8 + Tailwind CSS Frontend & PWA
└── package.json      # 📦 Root Monorepo Scripts
```

### 1. 🌐 `web/` (Web Application & PWA)
- **Framework**: React 19, Vite 8, Tailwind CSS v4, Lucide Icons.
- **Features**: 
  - Barcode scanner (`html5-qrcode`)
  - Calorie IQ & portion calculator
  - Food health inspector (WHO/FSSAI nuanced scoring)
  - Universal head-to-head comparison
  - Multi-store deals hub (Amazon, Flipkart, Blinkit, etc.)
  - 7 global languages (Malayalam, English, Hindi, Spanish, Arabic, French, German).
- **Run Locally**:
  ```bash
  npm run dev
  # OR
  cd web && npm run dev
  ```

### 2. ⚙️ `backend/` (REST API Server)
- **Framework**: Node.js, Express, CORS.
- **Port**: `http://localhost:5001`
- **Run Locally**:
  ```bash
  npm run server
  # OR
  cd backend && npm start
  ```

### 3. 📱 `android/` (Android Project)
- **Path**: `android/`
- Can be opened directly in **Android Studio**.
- Application ID: `com.scaniq.app`
- Minimum SDK: 22 | Target SDK: 34

### 4. 🍎 `ios/` (iOS Project)
- **Path**: `ios/`
- Can be opened in **Xcode** (`ios/App/App.xcodeproj` or workspace).
- Bundle ID: `com.scaniq.app`
- Minimum iOS Target: 14.0

---

## 🚀 Quick Start Commands (from repository root)

| Command | Action |
|---|---|
| `npm run dev` | Starts the Web frontend on `http://localhost:5173` |
| `npm run build` | Builds the Web production bundle in `web/dist/` |
| `npm run server` | Starts the Backend API server on `http://localhost:5001` |
| `npm run dev:backend` | Starts the Backend in watch development mode |
