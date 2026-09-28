const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Find the line with ✦ {currentData.name}
app = app.replace(
  '<span>✦ {currentData.name}</span>',
  '<div className="flex items-center gap-1.5"><MapPin size={12} /><span>{currentData.name}</span></div>'
);

// Note: it might be `<span>-% {currentData.name}</span>` due to mojibake or something.
// But wait, my script `fix_badge.cjs` injected `<span>✦ {currentData.name}</span>` literally. So it should be exact.

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Replaced star with MapPin");
