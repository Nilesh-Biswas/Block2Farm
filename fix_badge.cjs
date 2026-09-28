const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

const oldBadge = `<div className="absolute bottom-3 left-3 z-[1000] glass-overlay px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-accent tracking-wider uppercase pointer-events-none border border-accent/15">
                  ✦ {currentData.name}
                </div>`;

// Note: Mojibake might have corrupted the ✦ character into `-%`.
// Let's use a regex or string replacement that ignores the exact unicode character.
const badgeRegex = /<div className="absolute bottom-3 left-3 z-\[1000\] glass-overlay px-3 py-1\.5 rounded-lg text-\[10px\] font-mono font-bold text-accent tracking-wider uppercase pointer-events-none border border-accent\/15">\s*.*?\{currentData\.name\}\s*<\/div>/;

const newBadge = `<div className="absolute bottom-3 left-3 z-[1000] glass-overlay px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold text-accent tracking-wider uppercase pointer-events-none border border-accent/15 flex items-center gap-2">
                  <span>✦ {currentData.name}</span>
                  <span className="text-slate-400/50">•</span>
                  <span className="text-cyan-400">TERRAIN: {currentData.terrainType || 'UNKNOWN'}</span>
                </div>`;

app = app.replace(badgeRegex, newBadge);

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Updated App.jsx badge");
