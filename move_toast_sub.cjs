const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const startIdx = code.indexOf('{/* Inline SMS Notification */}');
if (startIdx !== -1) {
  const endIdx = code.indexOf(')}', startIdx) + 2;
  const toastBlock = code.substring(startIdx, endIdx);
  
  code = code.substring(0, startIdx) + code.substring(endIdx);
  
  // Clean up any double empty lines left behind
  code = code.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  const rightColRegex = /<div className="lg:col-span-4 flex flex-col gap-5">\s*<div className="flex-1">/;
  code = code.replace(
    rightColRegex,
    `<div className="lg:col-span-4 flex flex-col gap-5">\n            ${toastBlock}\n            <div className="flex-1">`
  );
  
  fs.writeFileSync('src/App.jsx', code, 'utf8');
  console.log("Moved toast via substring");
}
