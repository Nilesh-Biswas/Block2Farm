import React, { useState } from 'react';
import { Activity, Radio, Layers, Cpu, Satellite, Mountain, TreePine, Wheat, Waves, Landmark, TrendingDown, Building2, Droplets, Sprout, Leaf, Search, MapPin } from 'lucide-react';
import { SoftButton, SoftWell, SoftBadge } from './components/ui/Neumorphic';
import { WeatherTerminal } from './components/dashboard/WeatherTerminal';
import { AdvisoryPanel } from './components/dashboard/AdvisoryPanel';
import { RadarMapDisplay } from './components/dashboard/RadarMapDisplay';

import { ComparisonChart } from './components/dashboard/ComparisonChart';
import { MOCK_DB, REGIONS, ALL_NODES, getRegionForNode } from './data/mockData';

export default function App() {
  const [activePanchayat, setActivePanchayat] = useState('cg-1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentData, setCurrentData] = useState(MOCK_DB['cg-1']);
  
  // Search state for scalable node selection
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // New features state
  const [language, setLanguage] = useState('en');
  const [toastMessage, setToastMessage] = useState(null);

  React.useEffect(() => {
    const floodAlert = currentData.alerts?.find(a => a.type === 'critical');
    if (floodAlert && !isProcessing) {
      const timer = setTimeout(() => {
        setToastMessage(
          language === 'hi'
            ? `${currentData.nameHi || currentData.name} के 1,240 पंजीकृत किसानों को अलर्ट भेजा गया।`
            : `Auto-SMS broadcasted to 1,240 registered farmers in ${currentData.name}.`
        );
        // Auto-hide after 6 seconds
        setTimeout(() => setToastMessage(null), 6000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentData, isProcessing, language]);

  const filteredNodes = ALL_NODES.filter(node => 
    node.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (node.block && node.block.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (node.tooltip && node.tooltip.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDownscaleRequest = (id) => {
    if (id === activePanchayat || isProcessing) return;
    setActivePanchayat(id);
    setIsProcessing(true);
    setIsSearchOpen(false);
    setSearchQuery('');
    setTimeout(() => {
      setCurrentData(MOCK_DB[id]);
      setIsProcessing(false);
    }, 1200);
  };

  const handleSendSMS = (alert) => {
    const msg = language === 'hi' 
      ? `${currentData.name} में 1,240 पंजीकृत किसानों को अलर्ट भेजा गया।` 
      : `Alert broadcasted to 1,240 registered farmers in ${currentData.name}`;
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-dvh flex flex-col bg-slate-950 bg-grid-pattern">

      {/* Click-outside overlay to close search */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[9998]" onClick={() => setIsSearchOpen(false)} />
      )}

      {/* ===== TOP BAR ===== */}
      <header className="sticky top-0 z-[9999] glass-overlay border-b border-subtle/20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3 shrink-0">
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
          <div className="flex items-center gap-4 text-[11px] font-mono text-muted shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              System Online
            </span>
            <span className="text-subtle">|</span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <Satellite size={12} className="text-accent" />
              {ALL_NODES.length} Nodes
            </span>
            <span className="text-subtle hidden sm:block">|</span>
            <button 
              onClick={() => setLanguage(l => l === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2 py-1 bg-bg-surface border border-subtle/30 rounded cursor-pointer hover:border-accent/40 hover:text-accent transition-colors"
              title="Translate Advisories"
            >
              <span className={`px-1.5 rounded ${language === 'en' ? 'bg-accent/20 text-accent font-bold' : ''}`}>EN</span>
              <span className={`px-1.5 rounded ${language === 'hi' ? 'bg-accent/20 text-accent font-bold' : ''}`}>HI</span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 md:px-6 py-6">
        
        {/* Page Title Row */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground tracking-tight">
              {language === 'hi' ? 'स्वायत्त मौसम विज्ञान इंजन' : 'Autonomous Meteorological Engine'}
            </h2>
            <p className="text-muted text-sm mt-1 flex items-center gap-2">
              <Activity size={12} className="text-accent" />
              {language === 'hi' ? '12 किमी ब्लॉक → 1-5 वर्ग किमी पंचायत डाउनस्केलिंग • Physics-Guided ML' : '12km Block → 1-2 km Panchayat Downscaling • Physics-Guided ML'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <SoftBadge variant="accent">
              <Layers size={10} />
              {currentData.name} (1-2 km²)
            </SoftBadge>
            <SoftBadge variant="default">
              {language === 'hi' ? '12 किमी बेस' : '12km Base'}: {currentData.baseBlockTemp}°C
            </SoftBadge>
          </div>
        </div>

        {/* Dashboard Grid */}
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left: Map + Telemetry (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Top Controls Row */}
            <div className="flex flex-row items-center gap-4 relative z-[9999] w-full mb-4">
              {/* Scalable Node Search Selector */}
              <div className="relative w-full max-w-sm">
              <div 
                className={`
                  flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-base)] 
                  bg-bg-surface border transition-all duration-200 cursor-text
                  ${isSearchOpen ? 'border-accent/40 shadow-card' : 'border-subtle/40 hover:border-accent/20'}
                `}
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={16} className={isSearchOpen ? 'text-accent' : 'text-muted'} />
                <input 
                  type="text" 
                  placeholder={language === 'hi' ? "पंचायत या ब्लॉक खोजें (उदा. Kondagaon)..." : "Search Panchayat or Block (e.g. Badedongar)..."} 
                  className="bg-transparent border-none outline-none text-sm text-foreground flex-1 placeholder:text-muted/50"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredNodes.length > 0) {
                    handleDownscaleRequest(filteredNodes[0].id);
                  }
                }}
                />
                {!isSearchOpen && (
                  <div className="px-2 py-0.5 rounded bg-bg-elevated border border-subtle/20 text-[9px] font-bold text-muted uppercase tracking-wider hidden sm:block">
                    {ALL_NODES.length} Nodes
                  </div>
                )}
              </div>

              {/* Search Dropdown Results */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 py-1.5 rounded-xl bg-bg-elevated border border-subtle/30 shadow-card-hover z-[10000] animate-fade-in max-h-[320px] overflow-y-auto">
                  
                  {filteredNodes.length === 0 ? (
                    <div className="px-4 py-6 text-center text-sm text-muted">
                      No nodes found for "{searchQuery}"
                    </div>
                  ) : (
                    <>
                      <div className="px-3 py-1.5 mb-1 border-b border-subtle/15 flex justify-between items-center">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-muted uppercase">Global Nodes</span>
                        <span className="text-[9px] font-bold text-accent">{filteredNodes.length} Results</span>
                      </div>
                      
                      {filteredNodes.map((node) => {
                        const regionName = getRegionForNode(node.id)?.label || 'Unknown';
                        return (
                          <button
                            key={node.id}
                            onClick={() => handleDownscaleRequest(node.id)}
                            disabled={isProcessing}
                            className={`
                              w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm font-medium
                              transition-all duration-150 cursor-pointer border-l-2
                              ${node.id === activePanchayat
                                ? 'bg-accent/10 border-accent text-accent'
                                : 'border-transparent text-foreground/80 hover:bg-bg-hover/50 hover:text-foreground'}
                              ${isProcessing ? 'opacity-40 pointer-events-none' : ''}
                            `}
                          >
                            <div className={`p-1.5 rounded-md ${node.id === activePanchayat ? 'bg-accent/20' : 'bg-bg-surface border border-subtle/20'}`}>
                              <node.Icon size={14} className={node.id === activePanchayat ? 'text-accent' : 'text-muted'} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold flex items-center gap-2">
                                {node.label}
                                {node.id === activePanchayat && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                              </div>
                              <div className="text-[10px] text-muted/60 mt-0.5 flex items-center gap-1.5 truncate">
                                <MapPin size={9} />
                                {regionName} • {node.block} <span className="text-accent mx-0.5">→</span> {node.type} Terrain
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </div>

              {/* Inline SMS Notification */}
              {toastMessage && (
                <div className="animate-fade-in flex items-center gap-2.5 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[11px] font-mono tracking-wide text-emerald-400 shrink-0 backdrop-blur-md">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  {toastMessage}
                </div>
              )}
            </div>

            {/* Map */}
            <SoftWell className="h-[420px] relative z-0">
              <RadarMapDisplay
                activePanchayat={activePanchayat}
                terrainType={currentData.terrainType}
                onSelectPanchayat={handleDownscaleRequest}
                isProcessing={isProcessing}
              />

              {/* HUD: Block Info — top-right to avoid zoom controls */}
              <div className="absolute top-3 right-3 z-[1000] glass-overlay px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-foreground/70 flex items-center gap-2 pointer-events-none border border-subtle/20">
                <Radio size={10} className="text-accent" />
                {language === 'hi' ? 'बेस' : 'BASE'} {currentData.baseBlockTemp}°C
              </div>

              {/* HUD: Node Label — bottom-left */}
              <div className="absolute bottom-3 left-3 z-[1000] glass-overlay px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-accent tracking-wider uppercase pointer-events-none border border-accent/15 flex items-center gap-2">
                  <div className="flex items-center gap-1.5"><MapPin size={12} /><span>{currentData.name}</span></div>
                  <span className="text-slate-400/50">•</span>
                  <span className="text-cyan-400">TERRAIN: {currentData.terrainType || 'UNKNOWN'}</span>
                </div>
            </SoftWell>
            
            {/* Weather */}
            <div className="h-[200px]">
              <WeatherTerminal data={currentData.weather} isProcessing={isProcessing} language={language} />
            </div>
          </div>

          {/* Right: Advisories & Chart (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            <div className="flex-1">
              <AdvisoryPanel 
                alerts={currentData.alerts} 
                isProcessing={isProcessing} 
                language={language} 
                onSendSMS={handleSendSMS}
              />
            </div>
            
            <div className="h-[280px]">
              <ComparisonChart 
                baseTemp={currentData.baseBlockTemp} 
                localTemp={currentData.weather.temp} 
                isProcessing={isProcessing}
                language={language} 
              />
            </div>
          </div>
          </div>

      </main>
    </div>
  );
}