import React, { useState } from 'react';
import { Activity, Radio, Layers, Cpu, Satellite, Mountain, TreePine, Wheat, Waves, Landmark, Sun } from 'lucide-react';
import { SoftButton, SoftWell, SoftBadge } from './components/ui/Neumorphic';
import { WeatherTerminal } from './components/dashboard/WeatherTerminal';
import { AdvisoryPanel } from './components/dashboard/AdvisoryPanel';
import { RadarMapDisplay } from './components/dashboard/RadarMapDisplay';

// Simulated Backend Database for PGML Inference
const MOCK_DB = {
  'panchayat-1': {
    name: 'Rampur (Valley)',
    baseBlockTemp: 34,
    weather: { temp: 36.2, rain: 45.0, wind: 8 },
    alerts: [
      { type: 'critical', title: 'Flood Risk in Valley', message: 'Orographic pooling detected. 45mm rain expected. Suspend irrigation immediately.' },
      { type: 'warning', title: 'Pesticide Washout', message: 'Do not apply surface fertilizers today due to heavy surface runoff risk.' }
    ]
  },
  'panchayat-2': {
    name: 'Shikarpur (Hilltop)',
    baseBlockTemp: 34,
    weather: { temp: 28.5, rain: 2.0, wind: 24 },
    alerts: [
      { type: 'warning', title: 'High Wind Velocity', message: 'Altitude exposure causing 24km/h winds. Secure temporary crop covers.' },
      { type: 'safe', title: 'Low Moisture', message: 'Light rainfall expected. Safe to proceed with scheduled harvesting.' }
    ]
  },
  'panchayat-3': {
    name: 'Kondagaon (Plains)',
    baseBlockTemp: 34,
    weather: { temp: 34.1, rain: 12.5, wind: 15 },
    alerts: [
      { type: 'safe', title: 'Optimal Conditions', message: 'Standard evapotranspiration rates detected. Proceed with standard irrigation cycle.' }
    ]
  },
  'panchayat-4': {
    name: 'Narayanpur (Riverside)',
    baseBlockTemp: 33,
    weather: { temp: 32.8, rain: 30.0, wind: 12 },
    alerts: [
      { type: 'warning', title: 'River Surge Alert', message: 'Upstream rainfall causing 1.2m rise in Indravati. Move livestock from floodplain.' },
      { type: 'critical', title: 'Soil Erosion Risk', message: 'Riverbank saturation at 92%. Avoid heavy machinery near embankments.' }
    ]
  },
  'panchayat-5': {
    name: 'Dantewada (Forest)',
    baseBlockTemp: 32,
    weather: { temp: 29.4, rain: 18.0, wind: 6 },
    alerts: [
      { type: 'safe', title: 'Canopy Shield Active', message: 'Forest cover reducing direct rainfall impact by ~40%. Ideal for undergrowth planting.' },
      { type: 'warning', title: 'Low Visibility', message: 'Dense fog expected below canopy. Delay morning field operations by 2 hours.' }
    ]
  },
  'panchayat-6': {
    name: 'Jagdalpur (Plateau)',
    baseBlockTemp: 35,
    weather: { temp: 35.6, rain: 5.5, wind: 20 },
    alerts: [
      { type: 'critical', title: 'Heat Stress Warning', message: 'Surface temperature exceeding 35°C. Activate drip irrigation to prevent crop wilting.' },
      { type: 'safe', title: 'Wind Favorable', message: 'Steady 20km/h winds aiding evaporative cooling. Natural ventilation optimal.' }
    ]
  }
};

const NODES = [
  { id: 'panchayat-1', label: 'Valley', Icon: Waves, tooltip: 'Rampur — Low-lying valley zone' },
  { id: 'panchayat-2', label: 'Hilltop', Icon: Mountain, tooltip: 'Shikarpur — Elevated hilltop region' },
  { id: 'panchayat-3', label: 'Plains', Icon: Wheat, tooltip: 'Kondagaon — Agricultural plains' },
  { id: 'panchayat-4', label: 'Riverside', Icon: Activity, tooltip: 'Narayanpur — Indravati riverside' },
  { id: 'panchayat-5', label: 'Forest', Icon: TreePine, tooltip: 'Dantewada — Dense forest canopy' },
  { id: 'panchayat-6', label: 'Plateau', Icon: Landmark, tooltip: 'Jagdalpur — High plateau terrain' },
];

export default function App() {
  const [activePanchayat, setActivePanchayat] = useState('panchayat-1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentData, setCurrentData] = useState(MOCK_DB['panchayat-1']);

  const handleDownscaleRequest = (id) => {
    if (id === activePanchayat || isProcessing) return;
    setActivePanchayat(id);
    setIsProcessing(true);
    setTimeout(() => {
      setCurrentData(MOCK_DB[id]);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-grid-pattern">

      {/* ===== TOP BAR ===== */}
      <header className="sticky top-0 z-50 glass-overlay border-b border-subtle/20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/15">
              <Cpu size={18} className="text-accent" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-sm text-foreground tracking-tight">
                Block2Farm
              </h1>
              <SoftBadge variant="cyan">PGML Engine</SoftBadge>
            </div>
          </div>

          {/* Center: Status */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-muted">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              System Online
            </span>
            <span className="text-subtle">|</span>
            <span className="flex items-center gap-1.5">
              <Satellite size={12} className="text-accent" />
              {NODES.length} Nodes Active
            </span>
          </div>

          {/* Right: Node Selector */}
          <div className="flex items-center gap-1 flex-nowrap overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {NODES.map((node) => (
              <div key={node.id} className="relative shrink-0 group/tip">
                <SoftButton
                  onClick={() => handleDownscaleRequest(node.id)}
                  active={activePanchayat === node.id}
                  disabled={isProcessing}
                  size="sm"
                >
                  <node.Icon size={14} />
                  <span className="hidden xl:inline">{node.label}</span>
                </SoftButton>
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-subtle/30 shadow-card text-[10px] font-medium text-foreground whitespace-nowrap opacity-0 pointer-events-none translate-y-1 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 transition-all duration-200 z-50">
                  {node.tooltip}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-bg-elevated border-l border-t border-subtle/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-6 py-6">
        
        {/* Page Title Row */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground tracking-tight">
              Downscaling Dashboard
            </h2>
            <p className="text-muted text-sm mt-1 flex items-center gap-2">
              <Activity size={14} className="text-accent" />
              Physics-Guided ML • Panchayat-level weather intelligence
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <SoftBadge variant="accent">
              <Layers size={10} />
              {currentData.name}
            </SoftBadge>
            <SoftBadge variant="default">
              Block: {currentData.baseBlockTemp}°C
            </SoftBadge>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left: Map + Telemetry (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* Map */}
            <SoftWell className="h-[420px] relative">
              <RadarMapDisplay
                activePanchayat={activePanchayat}
                onSelectPanchayat={handleDownscaleRequest}
                isProcessing={isProcessing}
              />

              {/* HUD: Block Info — top-right to avoid zoom controls */}
              <div className="absolute top-3 right-3 z-[1000] glass-overlay px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-foreground/70 flex items-center gap-2 pointer-events-none border border-subtle/20">
                <Radio size={10} className="text-accent" />
                BASE {currentData.baseBlockTemp}°C
              </div>

              {/* HUD: Node Label — bottom-left */}
              <div className="absolute bottom-3 left-3 z-[1000] glass-overlay px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-accent tracking-wider uppercase pointer-events-none border border-accent/15">
                ◉ {currentData.name}
              </div>
            </SoftWell>
            
            {/* Weather */}
            <div className="h-[200px]">
              <WeatherTerminal data={currentData.weather} isProcessing={isProcessing} />
            </div>
          </div>

          {/* Right: Advisories (4 cols) */}
          <div className="lg:col-span-4">
            <AdvisoryPanel alerts={currentData.alerts} isProcessing={isProcessing} />
          </div>
        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-subtle/15 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-10 flex items-center justify-between">
          <p className="text-[10px] text-muted/50 font-mono tracking-wide">
            Block2Farm • Physics-Guided ML Downscaling Engine
          </p>
          <p className="text-[10px] text-muted/30 font-mono">
            v2.0 — Prototype
          </p>
        </div>
      </footer>
    </div>
  );
}