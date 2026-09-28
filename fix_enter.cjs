const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

const input_regex = /<input\s+type="text"\s+placeholder=\{[^>]+>\s*\}\)\}\s*\/>/;
// wait, the input is:
//               <input 
//                 type="text" 
//                 placeholder={language === 'hi' ? "..." : "Search Panchayat or Block (e.g. Supaul)..."} 
//                 className="bg-transparent border-none outline-none text-sm text-foreground flex-1 placeholder:text-muted/50"
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setIsSearchOpen(true);
//                 }}
//                 onFocus={() => setIsSearchOpen(true)}
//               />

// let's just do a string replacement on onFocus
app = app.replace(
  'onFocus={() => setIsSearchOpen(true)}',
  `onFocus={() => setIsSearchOpen(true)}\n                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredNodes.length > 0) {
                    handleDownscaleRequest(filteredNodes[0].id);
                  }
                }}`
);

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Added Enter key support");
