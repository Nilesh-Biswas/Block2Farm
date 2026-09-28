const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

code = code.replace(
  '          </div>\n        </div>\n        </div>',
  '          </div>\n        </div>'
);

fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
console.log("Removed extra div in RadarMapDisplay");
