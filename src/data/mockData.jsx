import { Activity, Mountain, TreePine, Wheat, Waves, Landmark, TrendingDown, Building2, Droplets, Sprout, Leaf, Wind, Sun, CloudRain } from 'lucide-react';

// Master list of 50 Nodes across India
const RAW_NODES = [
  // --- CHHATTISGARH (11) ---
  { id: 'cg-1', state: 'Chhattisgarh', name: 'Rampur', type: 'Valley', lat: 19.60, lng: 81.66, icon: Waves, tempMod: 2.2, rain: 45.0, wind: 8 },
  { id: 'cg-2', state: 'Chhattisgarh', name: 'Shikarpur', type: 'Hilltop', lat: 19.68, lng: 81.72, icon: Mountain, tempMod: -5.5, rain: 2.0, wind: 24 },
  { id: 'cg-3', state: 'Chhattisgarh', name: 'Kondagaon', type: 'Plains', lat: 19.59, lng: 81.65, icon: Wheat, tempMod: 0, rain: 12.5, wind: 15 },
  { id: 'cg-4', state: 'Chhattisgarh', name: 'Narayanpur', type: 'Riverside', lat: 19.73, lng: 81.25, icon: Activity, tempMod: -1.2, rain: 30.0, wind: 12 },
  { id: 'cg-5', state: 'Chhattisgarh', name: 'Dantewada', type: 'Forest', lat: 18.97, lng: 81.35, icon: TreePine, tempMod: -2.6, rain: 18.0, wind: 6 },
  { id: 'cg-6', state: 'Chhattisgarh', name: 'Jagdalpur', type: 'Plateau', lat: 19.08, lng: 82.02, icon: Landmark, tempMod: 1.5, rain: 5.5, wind: 20 },
  { id: 'cg-7', state: 'Chhattisgarh', name: 'Keshkal', type: 'Ghat Pass', lat: 19.86, lng: 81.59, icon: TrendingDown, tempMod: -4.0, rain: 35.0, wind: 18 },
  { id: 'cg-8', state: 'Chhattisgarh', name: 'Pharasgaon', type: 'Farmland', lat: 19.70, lng: 81.57, icon: Sprout, tempMod: 0.5, rain: 8.0, wind: 10 },
  { id: 'cg-9', state: 'Chhattisgarh', name: 'Kanker', type: 'Township', lat: 20.27, lng: 81.49, icon: Building2, tempMod: 0.8, rain: 10.0, wind: 14 },
  { id: 'cg-10', state: 'Chhattisgarh', name: 'Bhanupratappur', type: 'Basin', lat: 19.45, lng: 81.18, icon: Droplets, tempMod: 1.0, rain: 22.0, wind: 7 },
  { id: 'cg-11', state: 'Chhattisgarh', name: 'Sukma', type: 'Lowland', lat: 18.39, lng: 81.66, icon: Leaf, tempMod: 2.5, rain: 3.0, wind: 5 },

  // --- WEST BENGAL (8) ---
  { id: 'wb-1', state: 'West Bengal', name: 'Darjeeling', type: 'Hilltop', lat: 27.04, lng: 88.26, icon: Mountain, tempMod: -12.0, rain: 15.0, wind: 14 },
  { id: 'wb-2', state: 'West Bengal', name: 'Sundarbans', type: 'Coastal', lat: 21.94, lng: 89.18, icon: Droplets, tempMod: 1.5, rain: 60.0, wind: 35 },
  { id: 'wb-3', state: 'West Bengal', name: 'Purulia', type: 'Plateau', lat: 23.33, lng: 86.36, icon: Landmark, tempMod: 3.5, rain: 0.0, wind: 12 },
  { id: 'wb-4', state: 'West Bengal', name: 'Bardhaman', type: 'Plains', lat: 23.23, lng: 87.86, icon: Wheat, tempMod: 0, rain: 12.0, wind: 8 },
  { id: 'wb-5', state: 'West Bengal', name: 'Malda', type: 'Riverside', lat: 25.00, lng: 88.15, icon: Activity, tempMod: 1.0, rain: 25.0, wind: 10 },
  { id: 'wb-6', state: 'West Bengal', name: 'Siliguri', type: 'Valley', lat: 26.71, lng: 88.43, icon: Waves, tempMod: -2.0, rain: 40.0, wind: 15 },
  { id: 'wb-7', state: 'West Bengal', name: 'Kharagpur', type: 'Township', lat: 23.33, lng: 87.32, icon: Building2, tempMod: 1.2, rain: 8.0, wind: 6 },
  { id: 'wb-8', state: 'West Bengal', name: 'Jhargram', type: 'Forest', lat: 22.45, lng: 86.98, icon: TreePine, tempMod: -1.5, rain: 10.0, wind: 5 },

  // --- MAHARASHTRA (7) ---
  { id: 'mh-1', state: 'Maharashtra', name: 'Nashik', type: 'Valley', lat: 19.99, lng: 73.78, icon: Waves, tempMod: -1.0, rain: 5.0, wind: 10 },
  { id: 'mh-2', state: 'Maharashtra', name: 'Pune', type: 'Plateau', lat: 18.52, lng: 73.85, icon: Landmark, tempMod: -2.0, rain: 8.0, wind: 15 },
  { id: 'mh-3', state: 'Maharashtra', name: 'Ratnagiri', type: 'Coastal', lat: 16.99, lng: 73.30, icon: Droplets, tempMod: 1.0, rain: 45.0, wind: 22 },
  { id: 'mh-4', state: 'Maharashtra', name: 'Nagpur', type: 'Plains', lat: 21.14, lng: 79.08, icon: Sun, tempMod: 4.5, rain: 0.0, wind: 5 },
  { id: 'mh-5', state: 'Maharashtra', name: 'Mahabaleshwar', type: 'Hilltop', lat: 17.92, lng: 73.65, icon: Mountain, tempMod: -8.5, rain: 25.0, wind: 18 },
  { id: 'mh-6', state: 'Maharashtra', name: 'Solapur', type: 'Lowland', lat: 17.65, lng: 75.90, icon: Leaf, tempMod: 3.5, rain: 0.0, wind: 12 },
  { id: 'mh-7', state: 'Maharashtra', name: 'Jalgaon', type: 'Farmland', lat: 21.00, lng: 75.56, icon: Sprout, tempMod: 2.0, rain: 2.0, wind: 8 },

  // --- PUNJAB & HARYANA (6) ---
  { id: 'pb-1', state: 'Punjab', name: 'Ludhiana', type: 'Plains', lat: 30.90, lng: 75.85, icon: Wheat, tempMod: 2.5, rain: 0.0, wind: 10 },
  { id: 'pb-2', state: 'Punjab', name: 'Amritsar', type: 'Plains', lat: 31.63, lng: 74.87, icon: Wheat, tempMod: 3.0, rain: 0.0, wind: 8 },
  { id: 'pb-3', state: 'Punjab', name: 'Pathankot', type: 'Valley', lat: 32.26, lng: 75.64, icon: Waves, tempMod: -2.0, rain: 15.0, wind: 14 },
  { id: 'hr-1', state: 'Haryana', name: 'Karnal', type: 'Farmland', lat: 29.68, lng: 76.99, icon: Sprout, tempMod: 1.5, rain: 5.0, wind: 12 },
  { id: 'hr-2', state: 'Haryana', name: 'Hisar', type: 'Lowland', lat: 29.14, lng: 75.72, icon: Sun, tempMod: 4.0, rain: 0.0, wind: 6 },
  { id: 'hr-3', state: 'Haryana', name: 'Panchkula', type: 'Hilltop', lat: 30.69, lng: 76.86, icon: Mountain, tempMod: -3.5, rain: 10.0, wind: 16 },

  // --- TAMIL NADU & KERALA (8) ---
  { id: 'tn-1', state: 'Tamil Nadu', name: 'Ooty', type: 'Hilltop', lat: 11.41, lng: 76.69, icon: Mountain, tempMod: -10.0, rain: 20.0, wind: 15 },
  { id: 'tn-2', state: 'Tamil Nadu', name: 'Thanjavur', type: 'Basin', lat: 10.78, lng: 79.13, icon: Droplets, tempMod: 1.5, rain: 25.0, wind: 10 },
  { id: 'tn-3', state: 'Tamil Nadu', name: 'Coimbatore', type: 'Plateau', lat: 11.01, lng: 76.95, icon: Landmark, tempMod: -1.0, rain: 5.0, wind: 22 },
  { id: 'tn-4', state: 'Tamil Nadu', name: 'Madurai', type: 'Plains', lat: 9.92, lng: 78.11, icon: Sun, tempMod: 3.5, rain: 0.0, wind: 8 },
  { id: 'kl-1', state: 'Kerala', name: 'Munnar', type: 'Hilltop', lat: 10.08, lng: 77.05, icon: Mountain, tempMod: -8.0, rain: 35.0, wind: 12 },
  { id: 'kl-2', state: 'Kerala', name: 'Alleppey', type: 'Coastal', lat: 9.49, lng: 76.33, icon: Waves, tempMod: 0.5, rain: 45.0, wind: 18 },
  { id: 'kl-3', state: 'Kerala', name: 'Wayanad', type: 'Forest', lat: 11.68, lng: 76.13, icon: TreePine, tempMod: -4.0, rain: 28.0, wind: 8 },
  { id: 'kl-4', state: 'Kerala', name: 'Palakkad', type: 'Ghat Pass', lat: 10.78, lng: 76.65, icon: TrendingDown, tempMod: 2.0, rain: 12.0, wind: 25 },

  // --- RAJASTHAN & GUJARAT (10) ---
  { id: 'rj-1', state: 'Rajasthan', name: 'Jaisalmer', type: 'Lowland', lat: 26.91, lng: 70.90, icon: Sun, tempMod: 6.0, rain: 0.0, wind: 15 },
  { id: 'rj-2', state: 'Rajasthan', name: 'Udaipur', type: 'Valley', lat: 24.58, lng: 73.71, icon: Waves, tempMod: -1.5, rain: 5.0, wind: 8 },
  { id: 'rj-3', state: 'Rajasthan', name: 'Mount Abu', type: 'Hilltop', lat: 24.59, lng: 72.71, icon: Mountain, tempMod: -7.0, rain: 12.0, wind: 14 },
  { id: 'rj-4', state: 'Rajasthan', name: 'Kota', type: 'Riverside', lat: 25.18, lng: 75.83, icon: Activity, tempMod: 2.5, rain: 2.0, wind: 6 },
  { id: 'rj-5', state: 'Rajasthan', name: 'Sri Ganganagar', type: 'Farmland', lat: 29.90, lng: 73.87, icon: Sprout, tempMod: 4.5, rain: 0.0, wind: 10 },
  { id: 'gj-1', state: 'Gujarat', name: 'Bhuj', type: 'Plains', lat: 23.24, lng: 69.66, icon: Sun, tempMod: 5.0, rain: 0.0, wind: 18 },
  { id: 'gj-2', state: 'Gujarat', name: 'Surat', type: 'Coastal', lat: 21.17, lng: 72.83, icon: Droplets, tempMod: 1.0, rain: 15.0, wind: 22 },
  { id: 'gj-3', state: 'Gujarat', name: 'Gir', type: 'Forest', lat: 21.13, lng: 70.80, icon: TreePine, tempMod: 0.5, rain: 5.0, wind: 8 },
  { id: 'gj-4', state: 'Gujarat', name: 'Ahmedabad', type: 'Township', lat: 23.02, lng: 72.57, icon: Building2, tempMod: 3.5, rain: 0.0, wind: 12 },
  { id: 'gj-5', state: 'Gujarat', name: 'Saputara', type: 'Hilltop', lat: 20.57, lng: 73.74, icon: Mountain, tempMod: -4.5, rain: 20.0, wind: 16 },
];

const generateAlerts = (node) => {
  const alerts = [];
  
  if (node.rain > 30) {
    alerts.push({ 
      type: 'critical', 
      title: 'PostGIS Flood Alert', 
      titleHi: 'पोस्टजीआईएस बाढ़ चेतावनी',
      message: `30m DEM inference shows orographic pooling. ${node.rain}mm rain expected. Suspend irrigation immediately.`,
      messageHi: `30m DEM अनुमान पर्वतीय जल संचय दिखाता है। ${node.rain}mm बारिश की उम्मीद है। सिंचाई तुरंत रोकें।`
    });
  } else if (node.rain > 10) {
    alerts.push({ 
      type: 'warning', 
      title: 'Pesticide Washout', 
      titleHi: 'कीटनाशक बहने का जोखिम',
      message: 'Sentinel-2 telemetry predicts heavy surface runoff. Do not apply surface fertilizers today.',
      messageHi: 'सेंटिनल-2 टेलीमेट्री भारी सतही अपवाह की भविष्यवाणी करती है। आज उर्वरक न डालें।'
    });
  } else if (node.rain === 0 && node.tempMod > 2) {
    alerts.push({ 
      type: 'critical', 
      title: 'Severe Micro-Drought', 
      titleHi: 'गंभीर सूक्ष्म-सूखा',
      message: 'Sentinel-2 NDWI indicates acute desiccation. Activate emergency micro-irrigation protocols.',
      messageHi: 'सेंटिनल-2 NDWI तीव्र सूखे का संकेत देता है। आपातकालीन सूक्ष्म-सिंचाई प्रोटोकॉल सक्रिय करें।'
    });
  }

  if (node.wind > 20) {
    alerts.push({ 
      type: 'warning', 
      title: 'High Wind Velocity', 
      titleHi: 'तेज हवा की चेतावनी',
      message: `Navier-Stokes equation infers ${node.wind}km/h wind acceleration. Secure temporary crop covers.`,
      messageHi: `नेवियर-स्टोक्स समीकरण ${node.wind} किमी/घंटा हवा की गति का अनुमान लगाता है। अस्थायी फसलों को सुरक्षित करें।`
    });
  }

  if (node.tempMod < -4) {
    alerts.push({ 
      type: 'safe', 
      title: 'Elevation Cooling Inferred', 
      titleHi: 'ऊंचाई से तापमान में गिरावट',
      message: `Deterministic altitude lapse rate confirms ${node.tempMod}°C variance from base. Thermal stress nullified.`,
      messageHi: `ऊंचाई के कारण ${node.tempMod}°C तापमान में गिरावट की पुष्टि हुई। ऊष्मीय तनाव समाप्त हो गया है।`
    });
  } else if (node.tempMod > 3) {
    alerts.push({ 
      type: 'critical', 
      title: 'Thermal Threshold Breach', 
      titleHi: 'तापमान सीमा पार',
      message: `Hardware-free inference predicts surface temp anomaly of +${node.tempMod}°C. Heat stress rule triggered.`,
      messageHi: `हार्डवेयर-मुक्त अनुमान सतह के तापमान में +${node.tempMod}°C की वृद्धि की भविष्यवाणी करता है। गर्मी से बचाव नियम सक्रिय।`
    });
  }

  if (alerts.length === 0) {
    alerts.push({ 
      type: 'safe', 
      title: 'Baseline Alignment', 
      titleHi: 'सामान्य मौसम',
      message: '1-5 km² localized state matches block matrix. Atmospheric equations stable.',
      messageHi: '1-5 किमी² स्थानीय स्थिति ब्लॉक स्तर से मेल खाती है। मौसम की स्थिति स्थिर है।'
    });
    alerts.push({ 
      type: 'safe', 
      title: 'Crop Advisory', 
      titleHi: 'कृषि सलाह',
      message: 'PostGIS spatial join confirms optimal growth conditions. Proceed with standard operations.',
      messageHi: 'पोस्टजीआईएस स्थानिक डेटा इष्टतम विकास स्थितियों की पुष्टि करता है। मानक कृषि कार्य जारी रखें।'
    });
  }

  return alerts;
};

const MOCK_DB = {};
const PANCHAYAT_COORDS = {};
const stateMap = {};

RAW_NODES.forEach(node => {
  const baseBlockTemp = 32;
  MOCK_DB[node.id] = {
    name: `${node.name} (${node.type})`,
    baseBlockTemp,
    weather: {
      temp: parseFloat((baseBlockTemp + node.tempMod).toFixed(1)),
      rain: node.rain,
      wind: node.wind
    },
    alerts: generateAlerts(node)
  };

  PANCHAYAT_COORDS[node.id] = {
    lat: node.lat,
    lng: node.lng,
    name: `${node.name} (${node.type})`
  };

  if (!stateMap[node.state]) stateMap[node.state] = [];
  stateMap[node.state].push({
    id: node.id,
    label: node.type,
    Icon: node.icon,
    tooltip: `${node.name} — ${node.type} terrain anomaly detected`
  });
});

const REGIONS = Object.keys(stateMap).map(state => ({
  label: state,
  Icon: stateMap[state][0].Icon,
  nodes: stateMap[state]
}));

const ALL_NODES = REGIONS.flatMap(r => r.nodes);
const getRegionForNode = (nodeId) => REGIONS.find(r => r.nodes.some(n => n.id === nodeId));

export { MOCK_DB, REGIONS, PANCHAYAT_COORDS, ALL_NODES, getRegionForNode };
