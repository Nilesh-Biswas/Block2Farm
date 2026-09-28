const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace('1-5 km', '1-2 km');
code = code.replace('e.g. Supaul', 'e.g. Badedongar');

fs.writeFileSync('src/App.jsx', code, 'utf8');
console.log("Updated App.jsx placeholders");
