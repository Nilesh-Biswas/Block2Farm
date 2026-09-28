const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove old Toast
const oldToastRegex = /\{\/\* Toast Notification \*\/\}[\s\S]*?\}\)/;
app = app.replace(oldToastRegex, '');

// 2. Wrap search bar
const searchStartStr = `{/* Scalable Node Search Selector */}
            <div className="relative z-[9999] w-full max-w-sm">`;
const searchReplacement = `{/* Top Controls Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-[9999] w-full relative">
              {/* Scalable Node Search Selector */}
              <div className="relative w-full max-w-sm">`;

app = app.replace(searchStartStr, searchReplacement);

// Now we must close the new wrapper and add the inline notification AFTER the search bar block.
// The search bar block ends with the dropdown closing brace `)}`
// Let's find exactly where it ends. 
// Right after the dropdown is:
//               {/* Map Area */}
//               <div className="relative">
//                 ...

const mapAreaStr = `            <div className="relative">
              <SoftWell className="h-[420px] relative z-0">`;
const inlineNotification = `
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
            
            {/* Map Area */}
            <div className="relative">
              <SoftWell className="h-[420px] relative z-0">`;

// Wait, the original code doesn't have `            {/* Map Area */}`
// It has:
//               {/* Search Dropdown Results */}
//               {isSearchOpen && (
//                  ...
//               )}
// 
//               <SoftWell className="h-[420px] relative z-0">
// Let's replace right before `<SoftWell className="h-[420px] relative z-0">`

const beforeSoftWellStr = `            <SoftWell className="h-[420px] relative z-0">`;
const afterSearchBlock = `
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

app = app.replace(beforeSoftWellStr, afterSearchBlock.trimStart());

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Moved notification inline");
