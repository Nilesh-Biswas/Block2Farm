const fs = require('fs');
let adv = fs.readFileSync('src/components/dashboard/AdvisoryPanel.jsx', 'utf8');
adv = adv.replace(/\[ .* Auto-SMS Dispatched via Bhashini \(Hindi\) \]/, '[ \u2713 Auto-SMS Dispatched via Bhashini (Hindi) ]');
fs.writeFileSync('src/components/dashboard/AdvisoryPanel.jsx', adv, 'utf8');
