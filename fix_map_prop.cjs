const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

app = app.replace(
  '<RadarMapDisplay\n                activePanchayat={activePanchayat}',
  '<RadarMapDisplay\n                activePanchayat={activePanchayat}\n                terrainType={currentData.terrainType}'
);

fs.writeFileSync('src/App.jsx', app, 'utf8');
