const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

const lines = app.split('\n');
let newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('{/* Toast Notification */}')) {
    skip = true;
    continue;
  }
  if (skip && lines[i].includes(')}')) {
    skip = false;
    continue;
  }
  if (!skip) {
    newLines.push(lines[i]);
  }
}

fs.writeFileSync('src/App.jsx', newLines.join('\n'), 'utf8');
console.log("Removed old toast by line iteration");
