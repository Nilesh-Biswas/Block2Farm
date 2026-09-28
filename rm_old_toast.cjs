const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

const oldToastRegex = /\{\/\* Toast Notification \*\/\}[\s\S]*?\}\)/;
app = app.replace(oldToastRegex, '');

fs.writeFileSync('src/App.jsx', app, 'utf8');
