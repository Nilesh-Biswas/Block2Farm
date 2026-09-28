const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// I'll replace the first duplicate of `const [smsPreview, setSmsPreview] = useState(null);`
// Actually, I'll just remove lines 33-46 manually by finding the duplicate block.
const dup = `  const [smsPreview, setSmsPreview] = useState(null);

  React.useEffect(() => {
    const floodAlert = currentData.alerts?.find(a => a.type === 'critical');
    if (floodAlert && !isProcessing) {
      const timer = setTimeout(() => {
        setSmsPreview({
          message: floodAlert.message,
          messageHi: floodAlert.messageHi || 'सुपौल पंचायत: भारी बारिश की संभावना। कृपया सिंचाई तुरंत रोक दें।'
        });
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setSmsPreview(null);
    }
  }, [currentData, isProcessing]);`;

app = app.replace(dup, '');

fs.writeFileSync('src/App.jsx', app, 'utf8');
