const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

app = app.replace('</aside>\n\n      </main>', '</aside>\n        </div>\n      </main>');

fs.writeFileSync('src/App.jsx', app, 'utf8');
