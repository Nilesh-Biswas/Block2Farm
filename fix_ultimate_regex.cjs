const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove old Toast Notification
const toastStart = app.indexOf('{/* Toast Notification */}');
const mainStart = app.indexOf('<main', toastStart);
if (toastStart > -1 && mainStart > -1) {
  app = app.substring(0, toastStart) + app.substring(mainStart);
}

// 2. Wrap search block
const searchRegex = /\{\/\* Scalable Node Search Selector \*\/\}[\s\r\n]*<div className="relative z-\[9999\] w-full max-w-sm">/;
app = app.replace(
  searchRegex,
  `{/* Top Controls Row */}
            <div className="flex flex-row items-center gap-4 relative z-[9999] w-full mb-4">
              {/* Scalable Node Search Selector */}
              <div className="relative w-full max-w-sm">`
);

// 3. Inject inline toast and close wrapper
// We look for `{/* Map */}` or `<SoftWell className="h-[420px] relative z-0">`
const softWellRegex = /\{\/\*\s*Map\s*\*\/\}\s*<SoftWell className="h-\[420px\] relative z-0">/;
// If `{/* Map */}` is not there, just look for `<SoftWell`
let softWellIdx = app.search(softWellRegex);
if (softWellIdx === -1) {
  softWellIdx = app.indexOf('<SoftWell className="h-[420px] relative z-0">');
}

if (softWellIdx > -1) {
  const toastAndCloseWrapper = `
              {/* Inline SMS Notification */}
              {toastMessage && (
                <div className="animate-fade-in flex items-center gap-2.5 px-3 py-2 bg-success/15 border border-success/30 rounded-lg shadow-sm text-[11px] font-bold tracking-wide text-success shrink-0 backdrop-blur-md">
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  {toastMessage}
                </div>
              )}
            </div>

            `;
  app = app.substring(0, softWellIdx) + toastAndCloseWrapper + app.substring(softWellIdx);
}

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Applied changes perfectly");
