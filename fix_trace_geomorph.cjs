const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

// Update signature
code = code.replace(
  'export const RadarMapDisplay = ({ activePanchayat, onSelectPanchayat, isProcessing }) => {',
  'export const RadarMapDisplay = ({ activePanchayat, terrainType, onSelectPanchayat, isProcessing }) => {\n  const terrainString = terrainType ? terrainType.toLowerCase().replace(/\\s+/g, "_") : "unknown";'
);

// Inject geomorphology line
const targetLine = '<span className="text-slate-300">"base_grid":</span>';
const geomorphologyLine = `            <div className="flex justify-between items-center">
              <span className="text-slate-300">"geomorphology":</span>
              <span className="text-purple-400">"{terrainString}"</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">"base_grid":</span>`;

code = code.replace(
  '<div className="flex justify-between items-center">\n              <span className="text-slate-300">"base_grid":</span>',
  geomorphologyLine
);

fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
console.log("Updated PGML Trace in RadarMapDisplay");
