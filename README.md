# 🌾 Block2Farm: Frontend Dashboard (SIH26074)

> **Autonomous Meteorological Data Engine** - Frontend Prototype for Smart India Hackathon (SIH26074)

## 🎯 The Vision
Our solution bridges the severe spatial resolution gap in rural Indian weather forecasting by downscaling generic 12km block-level data into highly accurate **1–5 sq km Panchayat-level forecasts**. 

Because traditional downscaling relies on dense physical weather stations that most rural blocks lack, our system bypasses hardware constraints using a **Physics-Guided Machine Learning (PGML) architecture**. This frontend acts as the tactical GIS dashboard that visualizes this downscaled data, instantly translating complex meteorological telemetry into actionable, crop-specific agro-advisories to protect marginalized farmers and secure crop yields.

## 🚀 Frontend Highlights for Evaluators

### 1. Interactive Downscaling GIS Map (`RadarMapDisplay.jsx`)
- Plotted **67 authentic rural Panchayat nodes** deeply inland across 9 states.
- Explicitly demonstrates the conceptual **Block ➔ Panchayat** spatial downscaling natively in the interactive map popups and search engine.
- Custom React-Leaflet integration with dynamic fly-to animations and simulated processing overlays.

### 2. Microclimate Data Terminal (`WeatherTerminal.jsx`)
- Built using a high-contrast, tactile **Neumorphic / Brutalist dark theme** to feel like a trustworthy, serious data terminal rather than a generic template.
- Highly responsive layout handling complex metrics (temperature, rainfall, wind speeds) explicitly formatted for edge-case screen constraints.

### 3. PGML vs Baseline Visualization (`ComparisonChart.jsx`)
- Real-time animated area charts proving the mathematical inference model.
- Visually compares standard 12km grid data against our 1km PGML downscaled microclimate anomalies (e.g., capturing valley rain-shadows or hilltop winds).

### 4. Smart Agro-Advisory Panel (`AdvisoryPanel.jsx`)
- Context-aware rule engine outputs based on microclimate data (e.g., *PostGIS Flood Alerts*, *Pesticide Washout* warnings, *Severe Micro-Droughts*).
- Includes mock SMS triggering UI for farmer dissemination.

### 5. Deep Hindi Localization (`App.jsx` & UI Components)
- Full, native **English-to-Hindi** toggling baked directly into the state management.
- Translations cover complex meteorological terminology natively, completely avoiding clunky third-party browser plugins.

## 💻 Tech Stack
* **Framework:** React 18, Vite
* **Styling:** Tailwind CSS v4, Custom CSS Variables
* **Mapping:** React-Leaflet, OpenTopoMap tiles
* **Charting:** Recharts
* **Icons:** Lucide-React

## 🛠️ Quick Start (Local Setup)

1. **Navigate to the project directory**:
   ```bash
   cd Idea2
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser** to `http://localhost:5173` (or the port specified in your terminal).

## 📁 Key File Structure (For Code Review)
* `src/App.jsx` - Core layout, global state (Localization, Search, active nodes), and main UI orchestration.
* `src/data/mockData.jsx` - The simulated PGML/PostGIS backend database. Contains the 67 exact coordinates and the spatial rule engine for dynamic alerts.
* `src/components/dashboard/` - Core domain components (Map, Terminal, Chart, Advisories).
* `src/components/ui/Neumorphic.jsx` - The custom design system providing the tactile, high-contrast dark theme components.
* `src/style/globals.css` - Tailwind v4 `@theme` mappings and custom utility classes.
