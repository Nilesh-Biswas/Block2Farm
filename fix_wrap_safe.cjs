const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove old Toast Notification block by substring
const toastStart = app.indexOf('{/* Toast Notification */}');
if (toastStart > -1) {
  // find the first '<main' after toastStart
  const mainStart = app.indexOf('<main', toastStart);
  if (mainStart > -1) {
    app = app.substring(0, toastStart) + app.substring(mainStart);
  }
}

// 2. Wrap the search block
const searchStart = app.indexOf('{/* Scalable Node Search Selector */}');
const searchEndStr = '{/* Search Dropdown Results */}';
const searchEnd = app.indexOf(searchEndStr);

if (searchStart > -1 && searchEnd > -1) {
  
  // Find the exact closing </div> of the search block by looking for `<SoftWell`
  const softWellIdx = app.indexOf('<SoftWell className="h-[420px] relative z-0">', searchEnd);
  
  // The search block is everything from searchStart to softWellIdx
  const searchBlockFull = app.substring(searchStart, softWellIdx);
  
  // Replace the first div in searchBlockFull to remove w-full max-w-sm wait, no, just wrap it.
  // The original has: 
  // {/* Scalable Node Search Selector */}
  // <div className="relative z-[9999] w-full max-w-sm">
  
  let modifiedSearchBlock = searchBlockFull.replace(
    '{/* Scalable Node Search Selector */}\n            <div className="relative z-[9999] w-full max-w-sm">',
    `{/* Top Controls Row */}
            <div className="flex flex-row items-center gap-4 relative z-[9999] w-full mb-4">
              {/* Scalable Node Search Selector */}
              <div className="relative w-full max-w-sm">`
  );
  
  // We need to inject the toast right before the last closing </div> in `modifiedSearchBlock`.
  // Let's find the last </div>
  const lastDivIdx = modifiedSearchBlock.lastIndexOf('</div>');
  
  const toastInject = `</div>
              
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
            
  modifiedSearchBlock = modifiedSearchBlock.substring(0, lastDivIdx) + toastInject;

  app = app.substring(0, searchStart) + modifiedSearchBlock + app.substring(softWellIdx);
}

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Wrapped securely!");
