const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove old Toast
const lines = app.split('\n');
let newLines = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{/* Toast Notification */}')) {
    skip = true;
    continue;
  }
  if (skip && lines[i].includes(')}')) {
    skip = false;
    // Look ahead to see if the next line is empty, skip it too if needed, but whatever.
    continue;
  }
  if (!skip) {
    newLines.push(lines[i]);
  }
}
app = newLines.join('\n');

// 2. Wrap the Search Block properly
const searchStart = '            {/* Scalable Node Search Selector */}\n            <div className="relative z-[9999] w-full max-w-sm">';
const searchStartReplace = `            {/* Top Controls Row */}
            <div className="flex flex-row items-center gap-4 relative z-[9999] w-full">
              {/* Scalable Node Search Selector */}
              <div className="relative w-full max-w-sm">`;

app = app.replace(searchStart, searchStartReplace);

// The Search Block ends precisely at the end of the Dropdown Results, which ends right before the <SoftWell className="h-[420px] relative z-0"> (Wait, there might be empty lines).
// It ends at:
//                       })}
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//
//             {/* Map Area */}

// Let's replace the EXACT closing of the search block by finding `</SoftWell>` or similar? 
// The search block has a closing `</div>`. 
// Let's just find the `RadarMapDisplay` line and walk back.
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
console.log("Wrapped correctly");
