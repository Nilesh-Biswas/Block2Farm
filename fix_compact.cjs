const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Container sizing
app = app.replace('w-[280px] shrink-0', 'w-[240px] shrink-0');
app = app.replace('w-[280px] h-[520px] bg-black rounded-[36px] border-[6px]', 'w-[240px] h-[460px] bg-black rounded-[30px] border-[5px]');

// Notch sizing
app = app.replace('h-5 bg-zinc-900 rounded-b-xl w-32', 'h-4 bg-zinc-900 rounded-b-xl w-28');
app = app.replace('w-10 h-1 bg-zinc-950', 'w-8 h-[3px] bg-zinc-950');

// Header sizing
app = app.replace('gap-3 p-3 pt-5 border-b', 'gap-2.5 p-2.5 pt-4 border-b');
app = app.replace('w-8 h-8 rounded-full', 'w-7 h-7 rounded-full');
app = app.replace('<Activity size={14}', '<Activity size={12}');

// Chat Body text
app = app.replace('p-3 flex flex-col justify-end gap-2 pb-6', 'p-2.5 flex flex-col justify-end gap-2 pb-5');
app = app.replace('p-3 text-zinc-200 text-xs w-11/12', 'p-2.5 text-zinc-200 text-[11px] w-11/12');

// Footer Keyboard Area
app = app.replace('h-32 bg-zinc-900', 'h-28 bg-zinc-900');

// Loader sizing (if they go back to awaiting telemetry)
app = app.replace('w-12 h-12 rounded-full border-2', 'w-10 h-10 rounded-full border-2');

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log("Mockup made compact");
