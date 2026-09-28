const fs = require('fs');

const files = [
  'src/App.jsx',
  'src/components/dashboard/WeatherTerminal.jsx',
  'src/components/dashboard/ComparisonChart.jsx',
  'src/components/dashboard/AdvisoryPanel.jsx',
  'src/data/mockData.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/Â°/g, '°');
    content = content.replace(/Ã—/g, '×');
    content = content.replace(/Â—/g, '—');
    content = content.replace(/Â/g, '');
    content = content.replace(/C/g, '°C'); // Handle replacement character if it was corrupted
    fs.writeFileSync(file, content, 'utf8');
  }
});
