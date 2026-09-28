const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf8');

// Replace grid start
app = app.replace(
  '{/* Dashboard Grid */}\n        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">',
  '<div className="flex flex-col xl:flex-row gap-5 items-start">\n          {/* Dashboard Grid */}\n          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">'
);

// We need to inject the aside at the end of the flex wrapper, before </main>.
// First, find the closing of the grid:
//             </div>
//           </div>
//         </main>
app = app.replace(
  '            </div>\n          </div>\n        </main>',
  '            </div>\n          </div>\n\n          {/* Aside Phone Mockup */}\n          {smsPreview && (\n            <aside className="w-[280px] shrink-0 xl:sticky top-6 animate-fade-in mx-auto xl:mx-0">\n              <div className="relative w-[280px] h-[520px] bg-black rounded-[36px] border-[6px] border-zinc-900 shadow-2xl flex flex-col overflow-hidden pointer-events-auto group">\n                \n                {/* Close Button on Hover */}\n                <button \n                  onClick={() => setSmsPreview(null)}\n                  className="absolute top-4 right-4 z-20 w-6 h-6 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs"\n                >\n                  ×\n                </button>\n\n                {/* Phone Notch */}\n                <div className="absolute top-0 inset-x-0 h-5 bg-zinc-900 rounded-b-xl w-32 mx-auto z-10 flex justify-center items-center">\n                   <div className="w-10 h-1 bg-zinc-950 rounded-full" />\n                </div>\n                \n                {/* Phone Screen */}\n                <div className="flex-1 bg-zinc-950 flex flex-col mt-3">\n                  {/* SMS Header */}\n                  <div className="flex items-center gap-3 p-3 pt-5 border-b border-white/10 bg-zinc-900/50">\n                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">\n                      <Activity size={14} className="text-accent" />\n                    </div>\n                    <div>\n                      <div className="text-white text-xs font-semibold">{language === \'hi\' ? \'ब्लॉक2फार्म अलर्ट\' : \'Block2Farm Alert\'}</div>\n                      <div className="text-zinc-500 text-[9px] font-mono">now • Secure SMS</div>\n                    </div>\n                  </div>\n                  \n                  {/* Chat Body */}\n                  <div className="flex-1 p-3 bg-zinc-950 flex flex-col justify-end gap-2 pb-6">\n                    <div className="bg-zinc-800 rounded-2xl rounded-bl-sm p-3 text-zinc-200 text-xs w-11/12 shadow-lg border border-white/5 whitespace-pre-line leading-relaxed">\n                      {language === \'hi\' ? smsPreview.messageHi : smsPreview.message}\n                    </div>\n                    <div className="text-[9px] text-zinc-600 pl-1 font-mono">\n                      {language === \'hi\' ? `${currentData.nameHi || currentData.name} के 1,240 किसानों को भेजा गया` : `Delivered to 1,240 farmers in ${currentData.name}`}\n                    </div>\n                  </div>\n\n                  {/* Fake Keyboard Area & Bhashini Footer */}\n                  <div className="h-32 bg-zinc-900 border-t border-white/10 flex flex-col items-center justify-end pb-2 relative">\n                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-700/50 flex flex-col items-center gap-1">\n                        <span className="text-[10px] font-bold tracking-widest uppercase">Powered by</span>\n                        <span className="text-xs font-black tracking-wider text-accent/30">BHASHINI</span>\n                     </div>\n                     <div className="w-1/3 h-1 bg-zinc-700 rounded-full z-10" />\n                  </div>\n                </div>\n              </div>\n            </aside>\n          )}\n        </div>\n        </main>'
);

// Now we must REMOVE the old fixed SMS modal if it exists:
//       {/* SMS Phone Mockup Modal */}
//       {smsPreview && (
//         <div className="fixed bottom-6 right-6 ...
//          ...
//         </div>
//       )}
const old_modal_regex = /\{\/\* SMS Phone Mockup Modal \*\/\}[\s\S]*?\}\)/g;
// Actually there might be two now! Wait, one is inside the <aside> but it doesn't have the "fixed bottom-6 right-6" wrapper or the comment {/* SMS Phone Mockup Modal */}. The new one has {/* Aside Phone Mockup */}. So it's safe to remove the old one.
app = app.replace(old_modal_regex, '');

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Re-layout complete!");
