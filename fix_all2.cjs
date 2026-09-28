const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Hook code
const hook_code = `
  const [language, setLanguage] = useState('en');
  const [toastMessage, setToastMessage] = useState(null);
  const [smsPreview, setSmsPreview] = useState(null);

  React.useEffect(() => {
    const floodAlert = currentData.alerts?.find(a => a.type === 'critical');
    if (floodAlert && !isProcessing) {
      const timer = setTimeout(() => {
        setSmsPreview({
          message: floodAlert.message,
          messageHi: floodAlert.messageHi || 'सुपौल पंचायत: भारी बारिश की संभावना। कृपया सिंचाई तुरंत रोक दें।'
        });
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setSmsPreview(null);
    }
  }, [currentData, isProcessing]);
`;
app = app.replace(/const \[language, setLanguage\] = useState\('en'\);\s*const \[toastMessage, setToastMessage\] = useState\(null\);/, hook_code.trim());

// 2. PGML Inference Trace
const trace_overlay = `
              {/* PGML Inference Trace Overlay */}
              <div className="absolute top-3 left-3 z-[1000] p-3 rounded-lg text-[10px] font-mono leading-relaxed border border-subtle/30 bg-bg-deep/80 backdrop-blur-md text-foreground/80 hidden sm:block shadow-card">
                <div className="text-accent flex items-center gap-1.5 mb-1.5 border-b border-subtle/30 pb-1.5 font-bold tracking-widest">
                  <Cpu size={12} /> 
                  PGML INFERENCE TRACE
                </div>
                <div className="space-y-0.5">
                  <div className="flex justify-between w-48"><span>"base_grid":</span><span className="text-foreground">32.0</span></div>
                  <div className="flex justify-between w-48"><span>"dem_elev_offset":</span><span className="text-warning">+1.00</span></div>
                  <div className="flex justify-between w-48"><span>"ml_residual_delta":</span><span className="text-cyan font-bold">+0.50</span></div>
                  <div className="border-t border-subtle/20 my-1 pt-1 flex justify-between w-48 font-bold">
                     <span>"final_downscaled":</span><span className="text-success">33.5</span>
                  </div>
                </div>
              </div>
`;
app = app.replace('isProcessing={isProcessing}\n                />', 'isProcessing={isProcessing}\n                />\n' + trace_overlay);
app = app.replace('1-5 sq km Panchayat Downscaling', '1-2 km Panchayat Downscaling');
app = app.replace('Search Panchayat or Block (e.g. Kondagaon)...', 'Search Panchayat or Block (e.g. Supaul)...');
app = app.replace('? {currentData.name}', '<MapPin size={10} className="inline mr-1"/> {currentData.name}');
app = app.replace('BASE\'} {currentData.baseBlockTemp}C', 'BASE\'} {currentData.baseBlockTemp}°C');
app = app.replace('12km Base\'}: {currentData.baseBlockTemp}C', '12km Base\'}: {currentData.baseBlockTemp}°C');

// 3. Layout wrapper start
app = app.replace(
  '{/* Dashboard Grid */}\n        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">',
  '<div className="flex flex-col xl:flex-row gap-5 items-start">\n          {/* Dashboard Grid */}\n          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">'
);

// 4. Layout wrapper end & aside phone mockup
const ending = `            <div className="h-[280px]">
              <ComparisonChart 
                baseTemp={currentData.baseBlockTemp} 
                localTemp={currentData.weather.temp} 
                isProcessing={isProcessing}
                language={language} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}`;

const new_ending = `            <div className="h-[280px]">
              <ComparisonChart 
                baseTemp={currentData.baseBlockTemp} 
                localTemp={currentData.weather.temp} 
                isProcessing={isProcessing}
                language={language} 
              />
            </div>
          </div>
          </div>

          {/* Aside Phone Mockup */}
          {smsPreview && (
            <aside className="w-[280px] shrink-0 xl:sticky top-6 animate-fade-in mx-auto xl:mx-0 z-[10002]">
              <div className="relative w-[280px] h-[520px] bg-black rounded-[36px] border-[6px] border-zinc-900 shadow-2xl flex flex-col overflow-hidden pointer-events-auto group">
                
                {/* Close Button on Hover */}
                <button 
                  onClick={() => setSmsPreview(null)}
                  className="absolute top-4 right-4 z-20 w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs"
                >
                  ×
                </button>

                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-5 bg-zinc-900 rounded-b-xl w-32 mx-auto z-10 flex justify-center items-center">
                   <div className="w-10 h-1 bg-zinc-950 rounded-full" />
                </div>
                
                {/* Phone Screen */}
                <div className="flex-1 bg-zinc-950 flex flex-col mt-3">
                  {/* SMS Header */}
                  <div className="flex items-center gap-3 p-3 pt-5 border-b border-white/10 bg-zinc-900/50">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Activity size={14} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold">{language === 'hi' ? 'ब्लॉक2फार्म अलर्ट' : 'Block2Farm Alert'}</div>
                      <div className="text-zinc-500 text-[9px] font-mono">now • Secure SMS</div>
                    </div>
                  </div>
                  
                  {/* Chat Body */}
                  <div className="flex-1 p-3 bg-zinc-950 flex flex-col justify-end gap-2 pb-6">
                    <div className="bg-zinc-800 rounded-2xl rounded-bl-sm p-3 text-zinc-200 text-xs w-11/12 shadow-lg border border-white/5 whitespace-pre-line leading-relaxed">
                      {language === 'hi' ? smsPreview.messageHi : smsPreview.message}
                    </div>
                    <div className="text-[9px] text-zinc-600 pl-1 font-mono">
                      {language === 'hi' ? \`\${currentData.nameHi || currentData.name} के 1,240 किसानों को भेजा गया\` : \`Delivered to 1,240 farmers in \${currentData.name}\`}
                    </div>
                  </div>

                  {/* Fake Keyboard Area & Bhashini Footer */}
                  <div className="h-32 bg-zinc-900 border-t border-white/10 flex flex-col items-center justify-end pb-2 relative">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-700/50 flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold tracking-widest uppercase">Powered by</span>
                        <span className="text-xs font-black tracking-wider text-accent/30">BHASHINI</span>
                     </div>
                     <div className="w-1/3 h-1 bg-zinc-700 rounded-full z-10" />
                  </div>
                </div>
              </div>
            </aside>
          )}

        </div>
      </main>
    </div>
  );
}`;

app = app.replace(/ {12}<div className="h-\[280px\]">[\s\S]*\}\s*$/g, new_ending);

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Done");
