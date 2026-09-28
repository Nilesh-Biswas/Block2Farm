const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/AdvisoryPanel.jsx', 'utf8');

code = code.replace(
  'flex gap-3.5 p-4 rounded-xl',
  'flex items-start gap-3.5 p-4 rounded-xl'
);

// wait, the code might be:
//           flex gap-3.5 p-4 rounded-xl 

fs.writeFileSync('src/components/dashboard/AdvisoryPanel.jsx', code, 'utf8');
console.log("Replaced items-start!");
