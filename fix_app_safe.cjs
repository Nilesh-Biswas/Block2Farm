const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove the old Toast Notification block by substring
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
  const searchBlock = app.substring(searchStart, searchEnd);
  
  const wrappedSearch = `{/* Top Controls Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-[9999] w-full relative">
              ` + searchBlock + `
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
            
  app = app.substring(0, searchStart) + wrappedSearch + app.substring(searchEnd);
}

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Safely wrapped search block and injected inline toast");
