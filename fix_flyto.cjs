const fs = require('fs');
let code = fs.readFileSync('src/components/dashboard/RadarMapDisplay.jsx', 'utf8');

const old_flyto = `const FlyToActive = ({ activePanchayat }) => {
  const map = useMap();
  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    // Skip the initial mount \u2014 MapContainer already centers on the right spot
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const coords = PANCHAYAT_COORDS[activePanchayat];
    if (coords) {
      map.flyTo([coords.lat, coords.lng], 11, { duration: 1.2 });
    }
  }, [activePanchayat, map]);

  return null;
};`;

const new_flyto = `const FlyToActive = ({ activePanchayat }) => {
  const map = useMap();

  React.useEffect(() => {
    const coords = PANCHAYAT_COORDS[activePanchayat];
    if (coords) {
      // Use setView on initial render if it's way off, but flyTo is generally smoother.
      // If we are already there, flyTo does nothing. 
      map.flyTo([coords.lat, coords.lng], 11, { duration: 1.2 });
    }
  }, [activePanchayat, map]);

  return null;
};`;

// wait, the string might have Mojibake like "mount ?" MapContainer". 
// Let's use a regex instead.
const regex = /const FlyToActive = \(\{ activePanchayat \}\) => \{[\s\S]*?return null;\n\};/;

code = code.replace(regex, new_flyto);
fs.writeFileSync('src/components/dashboard/RadarMapDisplay.jsx', code, 'utf8');
console.log("Replaced FlyToActive.");
