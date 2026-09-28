const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Delete the old Toast block using line numbers or precise string search
const toastStartStr = `{/* Toast Notification */}`;
const toastEndStr = `)}

      <main`;
const idxStart = app.indexOf(toastStartStr);
const idxEnd = app.indexOf('<main', idxStart);
app = app.substring(0, idxStart) + app.substring(idxEnd);

// Wrap the search block
const searchStart = app.indexOf('{/* Scalable Node Search Selector */}');
const searchBlockToReplace = app.substring(
  searchStart,
  searchStart + '{/* Scalable Node Search Selector */}\n            <div className="relative z-[9999] w-full max-w-sm">'.length
);
// Make sure it matches exactly!
if (app.includes('{/* Scalable Node Search Selector */}\n            <div className="relative z-[9999] w-full max-w-sm">')) {
  app = app.replace(
    '{/* Scalable Node Search Selector */}\n            <div className="relative z-[9999] w-full max-w-sm">',
    `{/* Top Controls Row */}
            <div className="flex flex-row items-center gap-4 relative z-[9999] w-full mb-4">
              {/* Scalable Node Search Selector */}
              <div className="relative w-full max-w-sm">`
  );
}

// Now insert the notification right BEFORE the SoftWell map!
const softWellStr = `<SoftWell className="h-[420px] relative z-0">`;
const softWellIdx = app.indexOf(softWellStr);

// The div closing the "Scalable Node Search Selector" is RIGHT BEFORE this.
// Wait, is it? Yes.
// Let's insert the Toast Notification right before SoftWell but INSIDE our new wrapper!
// Our new wrapper needs a closing </div>!

const toastAndCloseWrapper = `  {/* Inline SMS Notification */}
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

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Replaced perfectly");
