const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// I'll replace it carefully.
const target = '<RadarMapDisplay';
const nextLine = 'activePanchayat={activePanchayat}';

app = app.replace(
  /<RadarMapDisplay[\s\S]*?activePanchayat=\{activePanchayat\}/,
  '<RadarMapDisplay\n                activePanchayat={activePanchayat}\n                terrainType={currentData.terrainType}'
);

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Fixed RadarMapDisplay props in App.jsx");
