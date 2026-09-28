const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

code = code.replace('<Popup>', '<Popup autoPan={false}>');

fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
console.log('Disabled popup autoPan');
