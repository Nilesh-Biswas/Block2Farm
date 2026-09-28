const fs = require('fs');
let adv = fs.readFileSync('src/components/dashboard/AdvisoryPanel.jsx', 'utf8');

// The string currently is: [ ✓ Auto-SMS Dispatched via Bhashini (Hindi) ]
// Let's change it to: [ Auto-SMS Dispatched via Bhashini (Hindi) ]
// Also remove the extra span formatting that might cause wrapping, maybe make it text-[9px]
adv = adv.replace('[ ✓ Auto-SMS Dispatched via Bhashini (Hindi) ]', 'Auto-SMS Dispatched via Bhashini (Hindi)');

fs.writeFileSync('src/components/dashboard/AdvisoryPanel.jsx', adv, 'utf8');
console.log("Fixed AdvisoryPanel");
