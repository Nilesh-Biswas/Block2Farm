const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/AdvisoryPanel.jsx', 'utf8');

const regex = /\{\/\* 3\. Card Header[\s\S]*?\{\/\* 6\. Automated Status Footer \*\//;

const replacement = `{/* Grid layout to keep icon isolated on the left, and all text perfectly flush on the right */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <ShieldAlert size={18} className="text-red-500" />
              </div>
              
              <div className="flex-1 flex flex-col">
                {/* 3. Card Header (Flex Row) */}
                <div className="flex items-center justify-between w-full">
                  <h3 className="font-bold text-white text-base tracking-wide">PostGIS Flood Alert</h3>
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-xs px-2 py-0.5 rounded font-bold tracking-wider uppercase">
                    CRITICAL
                  </span>
                </div>
                
                {/* 4. Context Badge */}
                <div className="mt-2">
                  <span className="bg-amber-500/10 text-amber-400 text-xs font-mono px-2 py-1 rounded w-max inline-block">
                    Target: Wheat (Harvest Stage)
                  </span>
                </div>

                {/* 5. Body Text */}
                <p className="text-slate-300 text-sm leading-relaxed mt-2.5">
                  <span className="text-slate-100 font-semibold">30m DEM</span> inference shows orographic pooling. <span className="text-slate-100 font-semibold">35mm rain expected</span>. <span className="text-slate-100 font-semibold">Suspend irrigation immediately</span>.
                </p>
              </div>
            </div>

            {/* 6. Automated Status Footer */`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/dashboard/AdvisoryPanel.jsx', code, 'utf8');
console.log("Restructured Alert Card for flush alignment");
