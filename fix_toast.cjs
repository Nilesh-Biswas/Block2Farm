const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Hook replacement
const hook_code = `
  const [language, setLanguage] = useState('en');
  const [toastMessage, setToastMessage] = useState(null);

  React.useEffect(() => {
    const floodAlert = currentData.alerts?.find(a => a.type === 'critical');
    if (floodAlert && !isProcessing) {
      const timer = setTimeout(() => {
        setToastMessage(
          language === 'hi'
            ? \`\${currentData.nameHi || currentData.name} के 1,240 पंजीकृत किसानों को अलर्ट भेजा गया।\`
            : \`Auto-SMS broadcasted to 1,240 registered farmers in \${currentData.name}.\`
        );
        // Auto-hide after 6 seconds
        setTimeout(() => setToastMessage(null), 6000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentData, isProcessing, language]);
`;

// we need to replace the hook block
// find `const [toastMessage, setToastMessage] = useState(null);` and `const [smsPreview, setSmsPreview] = useState(null);`
const startHook = app.indexOf('const [toastMessage, setToastMessage] = useState(null);');
const endHook = app.indexOf('}, [currentData, isProcessing]);') + '}, [currentData, isProcessing]);'.length;
app = app.substring(0, startHook) + hook_code.trim() + app.substring(endHook);

// 2. Remove the flex layout wrapper and aside
// Find the layout wrapper start:
// <div className="flex flex-col xl:flex-row gap-5 items-start">
//           {/* Dashboard Grid */}
//           <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
app = app.replace(
  '<div className="flex flex-col xl:flex-row gap-5 items-start">\n          {/* Dashboard Grid */}\n          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">',
  '{/* Dashboard Grid */}\n        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">'
);

// Find the aside ending and remove it
const aside_regex = /\{\/\* Aside Phone Mockup \*\/\}[\s\S]*?<\/aside>/;
app = app.replace(aside_regex, '');

// also remove the closing div of the wrapper which is before </main>
// we just need to replace `</div>\n\n        </div>\n      </main>` with `</div>\n      </main>`
app = app.replace('        </div>\n      </main>', '      </main>');

// 3. Inject Toast renderer
const toast_jsx = `
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[10002] animate-fade-in pointer-events-auto">
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl text-sm font-medium text-zinc-200">
            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-success"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            {toastMessage}
          </div>
        </div>
      )}
`;

app = app.replace('      <main', toast_jsx + '\n      <main');

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Mockup removed, toast added.");
