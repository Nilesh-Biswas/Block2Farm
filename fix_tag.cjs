const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// I'll remove one `</div>` before `</main>`
app = app.replace('        </div>\n      </main>', '      </main>');

fs.writeFileSync('src/App.jsx', app, 'utf8');
