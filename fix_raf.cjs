const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

const new_flyto = `const FlyToActive = ({ activePanchayat }) => {
  const map = useMap();

  React.useEffect(() => {
    const coords = PANCHAYAT_COORDS[activePanchayat];
    if (coords) {
      requestAnimationFrame(() => {
        map.invalidateSize();
        map.stop();
        map.flyTo([coords.lat, coords.lng], 11, { duration: 1.5 });
      });
    }
  }, [activePanchayat, map]);

  return null;
};`;

const startIdx = code.indexOf('const FlyToActive = ({ activePanchayat }) => {');
const endIdx = code.indexOf('};', startIdx) + 2;

if (startIdx !== -1 && endIdx !== -1) {
  code = code.substring(0, startIdx) + new_flyto + code.substring(endIdx);
  fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
  console.log('Added requestAnimationFrame to FlyToActive!');
}
