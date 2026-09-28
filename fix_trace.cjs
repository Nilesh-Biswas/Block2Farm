const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

const traceCode = `
        {/* PGML Inference Trace Overlay */}
        <div className="absolute top-4 left-14 z-[1000] bg-slate-900/85 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-lg pointer-events-none hidden sm:block">
          <div className="text-xs font-bold text-slate-400 tracking-wider mb-2">PGML INFERENCE TRACE</div>
          <div className="font-mono text-xs flex flex-col gap-1 w-48">
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
          </div>
        </div>
`;

// Insert right before `{/* Processing overlay */}`
const insertTarget = '{/* Processing overlay */}';
if (code.includes(insertTarget)) {
  code = code.replace(insertTarget, traceCode.trimStart() + '\n        ' + insertTarget);
  fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
  console.log("Injected PGML Trace!");
} else {
  console.log("Could not find insert target.");
}
