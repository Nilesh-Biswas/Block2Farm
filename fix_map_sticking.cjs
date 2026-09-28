const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

code = code.replace(
  'map.flyTo([coords.lat, coords.lng], 11, { duration: 1.2 });',
  'map.stop();\n      map.setView([coords.lat, coords.lng], 11, { animate: true, duration: 1.2, easeLinearity: 0.25 });'
);

fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
console.log("Fixed map sticking");
