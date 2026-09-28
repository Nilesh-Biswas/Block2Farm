const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const regex = /\{\/\* Inline SMS Notification \*\/\}[\s\S]*?\}\)/;
const match = code.match(regex);

if (match) {
  const toastBlock = match[0];
  code = code.replace(toastBlock, '');
  
  const rightColStr = '<div className="lg:col-span-4 flex flex-col gap-5">\n            <div className="flex-1">';
  const injectedRightCol = `<div className="lg:col-span-4 flex flex-col gap-5">\n            ${toastBlock}\n            <div className="flex-1">`;
  
  code = code.replace(
    '<div className="lg:col-span-4 flex flex-col gap-5">\n            <div className="flex-1">',
    injectedRightCol
  );
  // Wait, if line endings are different, the above replace might fail. Let's use regex for insertion too.
  
  code = code.replace(
    /<div className="lg:col-span-4 flex flex-col gap-5">\s*<div className="flex-1">/,
    `<div className="lg:col-span-4 flex flex-col gap-5">\n            ${toastBlock}\n            <div className="flex-1">`
  );
  
  fs.writeFileSync('src/App.jsx', code, 'utf8');
  console.log("Moved toastMessage to right column");
}
