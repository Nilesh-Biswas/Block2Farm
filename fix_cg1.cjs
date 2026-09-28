const fs = require('fs');
let code = fs.readFileSync('src/data/mockData.jsx', 'utf8');

code = code.replace(
  "id: 'cg-1', state: 'Chhattisgarh', panchayat: 'Badedongar', block: 'Farasgaon', type: 'Valley', lat: 19.74, lng: 81.69, icon: Waves, tempMod: 2.2, rain: 45.0, wind: 8",
  "id: 'cg-1', state: 'Chhattisgarh', panchayat: 'Badedongar', block: 'Farasgaon', type: 'Valley', lat: 19.74, lng: 81.69, icon: Waves, tempMod: 1.5, rain: 35.0, wind: 8"
);

fs.writeFileSync('src/data/mockData.jsx', code, 'utf8');
console.log("Updated mockData cg-1");
