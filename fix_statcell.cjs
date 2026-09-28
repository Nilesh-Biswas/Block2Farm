const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/WeatherTerminal.jsx', 'utf8');

code = code.replace(
  'className="flex flex-col items-center py-3 px-2 rounded-xl',
  'className="flex flex-col items-center text-center justify-center py-3 px-2 rounded-xl'
);

fs.writeFileSync('src/components/dashboard/WeatherTerminal.jsx', code, 'utf8');
console.log("Added text-center to StatCell");
