const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

// 1. Update MapUpdater
const oldUpdater = `const MapUpdater = ({ center }) => {
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
};`;

const newUpdater = `const MapUpdater = ({ center }) => {
  const map = useMap();

  React.useEffect(() => {
    if (center && center.lat && center.lng) {
      requestAnimationFrame(() => {
        map.stop();
        map.flyTo([center.lat, center.lng], 11, { duration: 1.5, easeLinearity: 0.25 });
        setTimeout(() => { map.invalidateSize(); }, 300);
      });
    }
  }, [center.lat, center.lng, map]);

  return null;
};`;

code = code.replace(oldUpdater, newUpdater);

// 2. Kill transitions on wrappers
code = code.replace(
  '<div className="relative w-full h-full min-h-[400px] rounded-[var(--radius-card)] overflow-hidden">',
  '<div className="relative w-full h-full min-h-[400px] rounded-[var(--radius-card)] overflow-hidden transition-none">'
);
code = code.replace(
  'className="w-full h-full"',
  'className="w-full h-full transition-none"'
);

// 3. Memoize TileLayer
code = code.replace(
  '<TileLayer\n          attribution=\'&copy; <a href="https://opentopomap.org">OpenTopoMap</a>\'\n          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"\n        />',
  '{React.useMemo(() => (\n          <TileLayer\n            attribution=\'&copy; <a href="https://opentopomap.org">OpenTopoMap</a>\'\n            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"\n          />\n        ), [])}'
);

fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
console.log("Applied aggressive stability fixes to RadarMapDisplay");
