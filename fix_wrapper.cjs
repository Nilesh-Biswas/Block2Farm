const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

app = app.replace(
  '<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">',
  '</div><div className="flex flex-col xl:flex-row gap-5 items-start">\n          {/* Dashboard Grid */}\n          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">'
);
// wait, the above `</div>` is WRONG. I don't need a closing div.
// The replace just targets the div.
app = app.replace(
  '<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">',
  '<div className="flex flex-col xl:flex-row gap-5 items-start">\n          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">'
);

fs.writeFileSync('src/App.jsx', app, 'utf8');
