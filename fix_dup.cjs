const fs = require('fs');
let adv = fs.readFileSync('src/components/dashboard/AdvisoryPanel.jsx', 'utf8');
const dup = `          <span className="px-2 py-0.5 rounded bg-bg-deep border border-subtle/20 text-[9px] font-bold text-accent uppercase tracking-wider">
            Target: Wheat (Harvest Stage)
          </span>
`;
// Just remove one instance of it
adv = adv.replace(dup, '');
fs.writeFileSync('src/components/dashboard/AdvisoryPanel.jsx', adv, 'utf8');
console.log("Fixed");
