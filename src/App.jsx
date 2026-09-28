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
  const [smsPreview, setSmsPreview] = useState(null);

  React.useEffect(() => {
    const floodAlert = currentData.alerts?.find(a => a.type === 'critical');
    if (floodAlert && !isProcessing) {
      const timer = setTimeout(() => {
        setSmsPreview({
          message: floodAlert.message,
          messageHi: floodAlert.messageHi || 'सुपौल पंचायत: भारी बारिश की संभावना। कृपया सिंचाई तुरंत रोक दें।'
        });
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setSmsPreview(null);
    }
  }, [currentData, isProcessing]);

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
    <div className="min-h-dvh flex flex-col bg-grid-pattern">

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
              <Activity size={14} className="text-accent" />
              {language === 'hi' ? '12 किमी ब्लॉक → 1-5 वर्ग किमी पंचायत डाउनस्केलिंग • Physics-Guided ML' : '12km Block → 1-2 km Panchayat Downscaling • Physics-Guided ML'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <SoftBadge variant="accent">
              <Layers size={10} />
              {currentData.name} (1-5 km²)
            </SoftBadge>
            <SoftBadge variant="default">
              {language === 'hi' ? '12 किमी बेस' : '12km Base'}: {currentData.baseBlockTemp}°C
            </SoftBadge>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left: Map + Telemetry (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Scalable Node Search Selector */}
            <div className="relative z-[9999] w-full max-w-sm">
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
                  placeholder={language === 'hi' ? "पंचायत या ब्लॉक खोजें (उदा. Kondagaon)..." : "Search Panchayat or Block (e.g. Supaul)..."} 
                  className="bg-transparent border-none outline-none text-sm text-foreground flex-1 placeholder:text-muted/50"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
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

            {/* Map */}
            <SoftWell className="h-[420px] relative z-0">
              <RadarMapDisplay
                activePanchayat={activePanchayat}
                onSelectPanchayat={handleDownscaleRequest}
                isProcessing={isProcessing}
              />

              {/* HUD: Block Info — top-right to avoid zoom controls */}
              <div className="absolute top-3 right-3 z-[1000] glass-overlay px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-foreground/70 flex items-center gap-2 pointer-events-none border border-subtle/20">
                <Radio size={10} className="text-accent" />
                {language === 'hi' ? 'बेस' : 'BASE'} {currentData.baseBlockTemp}°C
              </div>

              {/* HUD: Node Label — bottom-left */}
              <div className="absolute bottom-3 left-3 z-[1000] glass-overlay px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-accent tracking-wider uppercase pointer-events-none border border-accent/15">
                ◉ {currentData.name}
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

      {/* SMS Phone Mockup Modal */}
      {smsPreview && (
        <div className="fixed bottom-6 right-6 z-[10002] flex items-end justify-end pointer-events-none">
          <div className="relative w-[280px] h-[520px] bg-black rounded-[36px] border-[6px] border-zinc-900 shadow-2xl flex flex-col overflow-hidden animate-fade-in scale-in pointer-events-auto group">
            
            {/* Close Button on Hover */}
            <button 
              onClick={() => setSmsPreview(null)}
              className="absolute top-4 right-4 z-20 w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs"
            >
              ×
            </button>

            {/* Phone Notch */}
            <div className="absolute top-0 inset-x-0 h-5 bg-zinc-900 rounded-b-xl w-32 mx-auto z-10 flex justify-center items-center">
               <div className="w-10 h-1 bg-zinc-950 rounded-full" />
            </div>
            
            {/* Phone Screen */}
            <div className="flex-1 bg-zinc-950 flex flex-col mt-3">
              {/* SMS Header */}
              <div className="flex items-center gap-3 p-3 pt-5 border-b border-white/10 bg-zinc-900/50">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Activity size={14} className="text-accent" />
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">{language === 'hi' ? 'ब्लॉक2फार्म अलर्ट' : 'Block2Farm Alert'}</div>
                  <div className="text-zinc-500 text-[9px] font-mono">now • Secure SMS</div>
                </div>
              </div>
              
              {/* Chat Body */}
              <div className="flex-1 p-3 bg-zinc-950 flex flex-col justify-end gap-2 pb-6">
                <div className="bg-zinc-800 rounded-2xl rounded-bl-sm p-3 text-zinc-200 text-xs w-11/12 shadow-lg border border-white/5 whitespace-pre-line leading-relaxed">
                  {language === 'hi' ? smsPreview.messageHi : smsPreview.message}
                </div>
                <div className="text-[9px] text-zinc-600 pl-1 font-mono">
                  {language === 'hi' ? `${currentData.nameHi || currentData.name} के 1,240 किसानों को भेजा गया` : `Delivered to 1,240 farmers in ${currentData.name}`}
                </div>
              </div>

              {/* Fake Keyboard Area & Bhashini Footer */}
              <div className="h-32 bg-zinc-900 border-t border-white/10 flex flex-col items-center justify-end pb-2 relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-700/50 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase">Powered by</span>
                    <span className="text-xs font-black tracking-wider text-accent/30">BHASHINI</span>
                 </div>
                 <div className="w-1/3 h-1 bg-zinc-700 rounded-full z-10" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[10001] bg-bg-elevated border border-success/40 text-success px-4 py-2.5 rounded-full shadow-card animate-fade-in flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          {toastMessage}
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-subtle/15 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-10 flex items-center justify-between">
          <p className="text-[10px] text-muted/50 font-mono tracking-wide">
            {language === 'hi' 
              ? 'ब्लॉक2फार्म • हार्डवेयर-मुक्त PGML इंजन और पोस्टजीआईएस स्थानिक प्रोसेसर' 
              : 'Block2Farm • Hardware-free PGML Engine & PostGIS Spatial Processor'}
          </p>
          <p className="text-[10px] text-muted/30 font-mono">
            SIH26074
          </p>
        </div>
      </footer>
    </div>
  );
}