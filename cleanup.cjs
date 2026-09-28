const fs = require('fs');

const files = [
  'src/App.jsx',
  'src/data/mockData.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/Â°/g, '°');
    content = content.replace(/Ã—/g, '×');
    content = content.replace(/Â—/g, '—');
    content = content.replace(/Â/g, ''); // Remove stray Â
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log("Cleanup done");
