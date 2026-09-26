import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

import { PANCHAYAT_COORDS } from '../../data/mockData';

// Glowing marker icon for dark theme
const createIcon = (isActive) => L.divIcon({
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  html: `
    <div style="
      width: 24px; height: 24px;
      border-radius: 50%;
      background: ${isActive ? '#7c6aff' : 'rgba(28, 42, 63, 0.9)'};
      border: 2px solid ${isActive ? '#a78bfa' : 'rgba(100, 116, 139, 0.5)'};
      box-shadow: ${isActive
        ? '0 0 16px rgba(124, 106, 255, 0.6), 0 0 32px rgba(124, 106, 255, 0.2)'
        : '0 2px 8px rgba(0, 0, 0, 0.4)'};
      transition: all 0.3s ease;
      display: flex; align-items: center; justify-content: center;
    ">
      <div style="
        width: 6px; height: 6px;
        border-radius: 50%;
        background: ${isActive ? '#fff' : '#7c6aff'};
        ${isActive ? 'box-shadow: 0 0 6px rgba(255,255,255,0.5);' : ''}
      "></div>
    </div>
  `,
});

// Fly-to active panchayat ONLY when it changes (not on every re-render)
const FlyToActive = ({ activePanchayat }) => {
  const map = useMap();
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    // Skip the initial mount — MapContainer already centers on the right spot
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const coords = PANCHAYAT_COORDS[activePanchayat];
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 11, { duration: 1.2 });
    }
  }, [activePanchayat, map]);

  return null;
};

export const RadarMapDisplay = ({ activePanchayat, onSelectPanchayat, isProcessing }) => {
  const center = PANCHAYAT_COORDS[activePanchayat] || PANCHAYAT_COORDS['cg-1'];

  return (
    <div className="relative w-full h-full rounded-[var(--radius-card)] overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={11}
        scrollWheelZoom={true}
        zoomControl={true}
        className="w-full h-full"
        style={{ borderRadius: 'inherit' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />

        <FlyToActive activePanchayat={activePanchayat} />

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
            <Popup>
              <div style={{ fontFamily: 'var(--font-body)', textAlign: 'center', padding: '4px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', marginBottom: '2px' }}>{coords.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-muted)', marginBottom: '8px' }}>
                  Downscaled from {coords.block}
                </div>
                <span style={{ fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', background: id === activePanchayat ? 'var(--color-accent)' : 'transparent', color: id === activePanchayat ? '#fff' : 'var(--color-muted)', border: id === activePanchayat ? 'none' : '1px solid var(--color-subtle)' }}>
                  {id === activePanchayat ? '● ACTIVE NODE' : 'CLICK TO SELECT'}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Processing overlay */}
      {isProcessing && (
        <div className="absolute inset-0 z-[1000] glass-overlay flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
            <span className="font-mono text-[10px] font-bold text-foreground/70 tracking-[0.2em] uppercase">
              Fusing 30m DEM & Sentinel-2…
            </span>
          </div>
        </div>
      )}
    </div>
  );
};