const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

const oldTrace = `<div className="font-mono text-xs flex flex-col gap-1 w-48">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">"geomorphology":</span>
              <span className="text-purple-400">"{terrainString}"</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">"base_grid":</span>
              <span className="text-emerald-400">32.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">"dem_elev_offset":</span>
              <span className="text-amber-400">+1.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-400 font-semibold">"ml_residual_delta":</span>
              <span className="text-blue-400 font-semibold">+0.50</span>
            </div>
            <div className="border-t border-dashed border-slate-600 my-1"></div>
            <div className="flex justify-between items-center">
              <span className="text-white font-bold">"final_downscaled":</span>
              <span className="text-white font-bold">33.5</span>
            </div>
          </div>`;

const newTrace = `<div className="font-mono text-xs grid grid-cols-[130px_auto] gap-x-3 gap-y-1 w-max items-center">
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
          </div>`;

code = code.replace(oldTrace, newTrace);
fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
console.log("Updated PGML Trace layout");
