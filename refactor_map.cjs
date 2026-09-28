const fs = require('fs');
const oldCode = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

const newCode = `import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import { PANCHAYAT_COORDS } from '../../data/mockData';

// Glowing marker icon for dark theme
const createIcon = (isActive) => L.divIcon({
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  html: \`
    <div style="
      width: 24px; height: 24px;
      border-radius: 50%;
      background: \${isActive ? '#7c6aff' : 'rgba(28, 42, 63, 0.9)'};
      border: 2px solid \${isActive ? '#a78bfa' : 'rgba(100, 116, 139, 0.5)'};
      box-shadow: \${isActive
        ? '0 0 16px rgba(124, 106, 255, 0.6), 0 0 32px rgba(124, 106, 255, 0.2)'
        : '0 2px 8px rgba(0, 0, 0, 0.4)'};
      transition: all 0.3s ease;
      display: flex; align-items: center; justify-content: center;
    ">
      <div style="
        width: 6px; height: 6px;
        border-radius: 50%;
        background: \${isActive ? '#fff' : '#7c6aff'};
        \${isActive ? 'box-shadow: 0 0 6px rgba(255,255,255,0.5);' : ''}
      "></div>
    </div>
  \`,
});

// Smooth Panning Component
const MapUpdater = ({ center }) => {
  const map = useMap();

  React.useEffect(() => {
    if (center && center.lat && center.lng) {
      requestAnimationFrame(() => {
        map.invalidateSize();
        map.stop();
        map.flyTo([center.lat, center.lng], 11, { duration: 1.5, easeLinearity: 0.25 });
      });
    }
  }, [center.lat, center.lng, map]);

  return null;
};

export const RadarMapDisplay = ({ activePanchayat, terrainType, onSelectPanchayat, isProcessing }) => {
  const terrainString = terrainType ? terrainType.toLowerCase().replace(/\\s+/g, "_") : "unknown";
  const activeCenter = PANCHAYAT_COORDS[activePanchayat] || PANCHAYAT_COORDS['cg-1'];

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-[var(--radius-card)] overflow-hidden">
      <MapContainer
        center={[19.74, 81.69]} 
        zoom={11}
        scrollWheelZoom={true}
        zoomControl={true}
        className="w-full h-full"
        style={{ borderRadius: 'inherit' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={activeCenter} />

        {Object.entries(PANCHAYAT_COORDS).map(([id, coords]) => (
          <Marker
            key={id}
            position={[coords.lat, coords.lng]}
            icon={createIcon(id === activePanchayat)}
            eventHandlers={{
              click: () => {
                if (onSelectPanchayat && !isProcessing) {
                  onSelectPanchayat(id);
                }
              },
            }}
          >
            <Popup autoPan={false}>
              <div style={{ fontFamily: 'var(--font-body)', textAlign: 'center', padding: '4px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', marginBottom: '2px' }}>{coords.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-muted)', marginBottom: '8px' }}>
                  Downscaled from {coords.block}
                </div>
                <span style={{ fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', background: id === activePanchayat ? 'var(--color-accent)' : 'transparent', color: id === activePanchayat ? '#fff' : 'var(--color-muted)', border: id === activePanchayat ? 'none' : '1px solid var(--color-subtle)' }}>
                  {id === activePanchayat ? '✦ ACTIVE NODE' : 'CLICK TO SELECT'}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* PGML Inference Trace Overlay */}
      <div className="absolute top-4 left-14 z-[1000] bg-slate-900/85 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg pointer-events-none hidden sm:block">
        <div className="text-xs font-bold text-slate-400 tracking-wider mb-2">PGML INFERENCE TRACE</div>
        <div className="font-mono text-xs grid grid-cols-[145px_auto] gap-x-2 gap-y-1 w-max items-center">
          <span className="text-slate-300">"geomorphology":</span>
          <span className="text-purple-400 text-right">"{terrainString}"</span>
          
          <span className="text-slate-300">"base_grid":</span>
          <span className="text-emerald-400 text-right">32.0</span>
          
          <span className="text-slate-300">"dem_elev_offset":</span>
          <span className="text-amber-400 text-right">+1.00</span>
          
          <span className="text-blue-400 font-semibold">"ml_residual_delta":</span>
          <span className="text-blue-400 font-semibold text-right">+0.50</span>
          
          <div className="col-span-2 border-t border-dashed border-slate-600 my-1"></div>
          
          <span className="text-white font-bold">"final_downscaled":</span>
          <span className="text-white font-bold text-right">33.5</span>
        </div>
      </div>

      {/* Processing overlay */}
      {isProcessing && (
        <div className="absolute inset-0 z-[1000] glass-overlay flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
            <span className="font-mono text-[10px] font-bold text-foreground/70 tracking-[0.2em] uppercase">
              Fusing 30m DEM & Sentinel-2...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
`;
fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', newCode, 'utf8');
console.log('Successfully refactored Map component');
