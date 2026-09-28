const fs = require('fs');
let code = fs.readFileSync('src/data/mockData.jsx', 'utf8');

code = code.replace(
  'name: `${node.panchayat} Panchayat`,',
  'name: `${node.panchayat} Panchayat`,\n      terrainType: node.type,'
);

fs.writeFileSync('src/data/mockData.jsx', code, 'utf8');
console.log("Added terrainType to MOCK_DB");
