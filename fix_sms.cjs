const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf8');

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

const modal_jsx = `
      </main>

      {/* SMS Phone Mockup Modal */}
      {smsPreview && (
        <div className="fixed bottom-6 right-6 z-[10002] flex items-end justify-end pointer-events-none">
          <div className="relative w-[280px] h-[520px] bg-black rounded-[36px] border-[6px] border-zinc-900 shadow-2xl flex flex-col overflow-hidden animate-fade-in scale-in pointer-events-auto group">
            
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
        </div>
      )}
`;

app = app.replace('      </main>', modal_jsx.trim());

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("SMS Modal injected");
