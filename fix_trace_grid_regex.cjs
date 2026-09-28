const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

const regex = /<div className="font-mono text-xs flex flex-col gap-1 w-48">[\s\S]*?<\/div>\s*<\/div>/;
const newTrace = `<div className="font-mono text-xs grid grid-cols-[145px_auto] gap-x-2 gap-y-1 w-max items-center">
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
        </div>`;

code = code.replace(regex, newTrace);
fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
console.log("Forced update of PGML Trace layout via Regex");
