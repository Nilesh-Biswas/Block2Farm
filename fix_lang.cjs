const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// The duplicate string:
//     const [language, setLanguage] = useState('en');
//     const [language, setLanguage] = useState('en');
// Let's replace one of them.
app = app.replace("const [language, setLanguage] = useState('en');\n  const [language, setLanguage] = useState('en');", "const [language, setLanguage] = useState('en');");

// wait, the first one might have double quotes
app = app.replace(/const \[language, setLanguage\] = useState\(["']en["']\);\s*const \[language, setLanguage\] = useState\(["']en["']\);/, "const [language, setLanguage] = useState('en');");

fs.writeFileSync('src/App.jsx', app, 'utf8');
