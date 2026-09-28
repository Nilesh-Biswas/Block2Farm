const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Delete Toast Notification block precisely
const toastBlock = `      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[10002] animate-fade-in pointer-events-auto">
          <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl text-sm font-medium text-zinc-200">
            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-success"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            {toastMessage}
          </div>
        </div>
      )}`;

app = app.replace(toastBlock, '');

// 2. Wrap the Scalable Node Search Selector
const searchBlockStart = `            {/* Scalable Node Search Selector */}
            <div className="relative z-[9999] w-full max-w-sm">`;

const wrappedSearchBlockStart = `            {/* Top Controls Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-[9999] w-full relative">
              {/* Scalable Node Search Selector */}
              <div className="relative w-full max-w-sm">`;

app = app.replace(searchBlockStart, wrappedSearchBlockStart);

// 3. Close the flex wrapper AFTER the search block.
// The search block ends right before `{/* Map Area */}` (wait, it's just `<SoftWell className="h-[420px] relative z-0">`)
// Actually, I can just inject the closing tag and the toast message right before `<SoftWell className="h-[420px] relative z-0">`

const mapStart = `            <SoftWell className="h-[420px] relative z-0">`;
const injectedToast = `              </div>
              
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
            
            <SoftWell className="h-[420px] relative z-0">`;

app = app.replace(mapStart, injectedToast.trimStart());

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Replaced toast successfully");
