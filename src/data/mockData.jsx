import { Activity, Mountain, TreePine, Wheat, Waves, Landmark, TrendingDown, Building2, Droplets, Sprout, Leaf, Wind, Sun, CloudRain } from 'lucide-react';

// Master list of 67 Authentic Rural Nodes across India
const RAW_NODES = [
  // --- CHHATTISGARH (12) - Focus on Bastar & Rural belts ---
  { id: 'cg-1', state: 'Chhattisgarh', panchayat: 'Badedongar', block: 'Farasgaon', type: 'Valley', lat: 19.74, lng: 81.69, icon: Waves, tempMod: 1.5, rain: 35.0, wind: 8 },
  { id: 'cg-2', state: 'Chhattisgarh', panchayat: 'Chitrakote', block: 'Lohandiguda', type: 'Riverside', lat: 19.20, lng: 81.71, icon: Droplets, tempMod: -1.5, rain: 30.0, wind: 14 },
  { id: 'cg-3', state: 'Chhattisgarh', panchayat: 'Gumiya', block: 'Bastanar', type: 'Hilltop', lat: 19.04, lng: 81.65, icon: Mountain, tempMod: -5.5, rain: 2.0, wind: 24 },
  { id: 'cg-4', state: 'Chhattisgarh', panchayat: 'Dhaurai', block: 'Narayanpur', type: 'Forest', lat: 19.73, lng: 81.25, icon: TreePine, tempMod: -2.6, rain: 18.0, wind: 6 },
  { id: 'cg-5', state: 'Chhattisgarh', panchayat: 'Sarona', block: 'Narharpur', type: 'Plains', lat: 20.35, lng: 81.54, icon: Wheat, tempMod: 0, rain: 12.5, wind: 15 },
  { id: 'cg-6', state: 'Chhattisgarh', panchayat: 'Kuakonda', block: 'Dantewada', type: 'Plateau', lat: 18.82, lng: 81.42, icon: Landmark, tempMod: 1.5, rain: 5.5, wind: 20 },
  { id: 'cg-7', state: 'Chhattisgarh', panchayat: 'Bade Rajpur', block: 'Keshkal', type: 'Ghat Pass', lat: 19.98, lng: 81.65, icon: TrendingDown, tempMod: -4.0, rain: 35.0, wind: 18 },
  { id: 'cg-8', state: 'Chhattisgarh', panchayat: 'Lanjoda', block: 'Pharasgaon', type: 'Farmland', lat: 19.70, lng: 81.57, icon: Sprout, tempMod: 0.5, rain: 8.0, wind: 10 },
  { id: 'cg-9', state: 'Chhattisgarh', panchayat: 'Arajdongri', block: 'Bhanupratappur', type: 'Basin', lat: 20.30, lng: 81.05, icon: Droplets, tempMod: 1.0, rain: 22.0, wind: 7 },
  { id: 'cg-10', state: 'Chhattisgarh', panchayat: 'Kerlapal', block: 'Sukma', type: 'Lowland', lat: 18.39, lng: 81.66, icon: Leaf, tempMod: 2.5, rain: 3.0, wind: 5 },
  { id: 'cg-11', state: 'Chhattisgarh', panchayat: 'Chingitarai', block: 'Patthalgaon', type: 'Farmland', lat: 22.56, lng: 83.74, icon: Sprout, tempMod: 1.2, rain: 0.0, wind: 8 },
  { id: 'cg-12', state: 'Chhattisgarh', panchayat: 'Tamlida', block: 'Mainpat', type: 'Hilltop', lat: 22.82, lng: 83.28, icon: Mountain, tempMod: -6.0, rain: 15.0, wind: 12 },

  // --- WEST BENGAL (10) - Rural Deltas & Hills ---
  { id: 'wb-1', state: 'West Bengal', panchayat: 'Canning', block: 'Canning', type: 'Coastal', lat: 22.31, lng: 88.65, icon: Droplets, tempMod: 1.5, rain: 60.0, wind: 35 },
  { id: 'wb-2', state: 'West Bengal', panchayat: 'Matha', block: 'Baghmundi', type: 'Plateau', lat: 23.19, lng: 86.04, icon: Landmark, tempMod: 3.5, rain: 0.0, wind: 12 },
  { id: 'wb-3', state: 'West Bengal', panchayat: 'Kankalitala', block: 'Bolpur', type: 'Plains', lat: 23.68, lng: 87.72, icon: Wheat, tempMod: 0, rain: 12.0, wind: 8 },
  { id: 'wb-4', state: 'West Bengal', panchayat: 'Matigara', block: 'Siliguri', type: 'Hilltop', lat: 26.71, lng: 88.38, icon: Mountain, tempMod: -12.0, rain: 15.0, wind: 14 },
  { id: 'wb-5', state: 'West Bengal', panchayat: 'Gangarampur', block: 'Gangarampur', type: 'Riverside', lat: 25.40, lng: 88.52, icon: Activity, tempMod: 1.0, rain: 25.0, wind: 10 },
  { id: 'wb-6', state: 'West Bengal', panchayat: 'Gorubathan', block: 'Malbazar', type: 'Valley', lat: 26.96, lng: 88.70, icon: Waves, tempMod: -2.0, rain: 40.0, wind: 15 },
  { id: 'wb-7', state: 'West Bengal', panchayat: 'Belpahari', block: 'Binpur', type: 'Forest', lat: 22.63, lng: 86.76, icon: TreePine, tempMod: -1.5, rain: 10.0, wind: 5 },
  { id: 'wb-8', state: 'West Bengal', panchayat: 'Minakhan', block: 'Minakhan', type: 'Basin', lat: 22.47, lng: 88.73, icon: Droplets, tempMod: 2.2, rain: 45.0, wind: 28 },
  { id: 'wb-9', state: 'West Bengal', panchayat: 'Lodhasuli', block: 'Jhargram', type: 'Forest', lat: 22.37, lng: 87.03, icon: Leaf, tempMod: 0.5, rain: 15.0, wind: 6 },
  { id: 'wb-10', state: 'West Bengal', panchayat: 'Sainthia', block: 'Birbhum', type: 'Farmland', lat: 23.94, lng: 87.68, icon: Sprout, tempMod: 1.8, rain: 0.0, wind: 9 },

  // --- MAHARASHTRA (9) - Vidarbha & Marathwada ---
  { id: 'mh-1', state: 'Maharashtra', panchayat: 'Madalmohi', block: 'Georai', type: 'Plateau', lat: 19.34, lng: 75.68, icon: Landmark, tempMod: -2.0, rain: 8.0, wind: 15 },
  { id: 'mh-2', state: 'Maharashtra', panchayat: 'Zari Jamni', block: 'Pandharkawada', type: 'Plains', lat: 20.08, lng: 78.50, icon: Sun, tempMod: 4.5, rain: 0.0, wind: 5 },
  { id: 'mh-3', state: 'Maharashtra', panchayat: 'Guhagar', block: 'Chiplun', type: 'Coastal', lat: 17.47, lng: 73.19, icon: Droplets, tempMod: 1.0, rain: 45.0, wind: 22 },
  { id: 'mh-4', state: 'Maharashtra', panchayat: 'Bhimashankar', block: 'Khed', type: 'Hilltop', lat: 19.07, lng: 73.53, icon: Mountain, tempMod: -8.5, rain: 25.0, wind: 18 },
  { id: 'mh-5', state: 'Maharashtra', panchayat: 'Mangalwedha', block: 'Solapur', type: 'Lowland', lat: 17.51, lng: 75.44, icon: Leaf, tempMod: 3.5, rain: 0.0, wind: 12 },
  { id: 'mh-6', state: 'Maharashtra', panchayat: 'Yawal', block: 'Jalgaon', type: 'Farmland', lat: 21.17, lng: 75.67, icon: Sprout, tempMod: 2.0, rain: 2.0, wind: 8 },
  { id: 'mh-7', state: 'Maharashtra', panchayat: 'Melghat', block: 'Chikhaldara', type: 'Forest', lat: 21.40, lng: 77.32, icon: TreePine, tempMod: -3.5, rain: 20.0, wind: 14 },
  { id: 'mh-8', state: 'Maharashtra', panchayat: 'Nandurbar', block: 'Akkalkuwa', type: 'Valley', lat: 21.56, lng: 74.01, icon: Waves, tempMod: 1.5, rain: 5.0, wind: 10 },
  { id: 'mh-9', state: 'Maharashtra', panchayat: 'Sindkhed Raja', block: 'Buldhana', type: 'Farmland', lat: 19.94, lng: 76.13, icon: Wheat, tempMod: 2.5, rain: 0.0, wind: 11 },

  // --- PUNJAB & HARYANA (8) ---
  { id: 'pb-1', state: 'Punjab', panchayat: 'Chhajli', block: 'Sunam', type: 'Plains', lat: 30.13, lng: 75.99, icon: Wheat, tempMod: 2.5, rain: 0.0, wind: 10 },
  { id: 'pb-2', state: 'Punjab', panchayat: 'Tarn Taran', block: 'Tarn Taran', type: 'Plains', lat: 31.45, lng: 74.92, icon: Wheat, tempMod: 3.0, rain: 0.0, wind: 8 },
  { id: 'pb-3', state: 'Punjab', panchayat: 'Hoshiarpur', block: 'Hoshiarpur', type: 'Valley', lat: 31.53, lng: 75.91, icon: Waves, tempMod: -2.0, rain: 15.0, wind: 14 },
  { id: 'pb-4', state: 'Punjab', panchayat: 'Nurpur Bedi', block: 'Rupnagar', type: 'Basin', lat: 31.06, lng: 76.43, icon: Droplets, tempMod: -0.5, rain: 5.0, wind: 7 },
  { id: 'hr-1', state: 'Haryana', panchayat: 'Gharaunda', block: 'Karnal', type: 'Farmland', lat: 29.53, lng: 76.97, icon: Sprout, tempMod: 1.5, rain: 5.0, wind: 12 },
  { id: 'hr-2', state: 'Haryana', panchayat: 'Adampur', block: 'Hisar', type: 'Lowland', lat: 29.26, lng: 75.46, icon: Sun, tempMod: 4.0, rain: 0.0, wind: 6 },
  { id: 'hr-3', state: 'Haryana', panchayat: 'Morni', block: 'Panchkula', type: 'Hilltop', lat: 30.69, lng: 77.08, icon: Mountain, tempMod: -3.5, rain: 10.0, wind: 16 },
  { id: 'hr-4', state: 'Haryana', panchayat: 'Loharu', block: 'Bhiwani', type: 'Plains', lat: 28.43, lng: 75.81, icon: Wheat, tempMod: 5.0, rain: 0.0, wind: 20 },

  // --- TAMIL NADU & KERALA (10) ---
  { id: 'tn-1', state: 'Tamil Nadu', panchayat: 'Kabisthalam', block: 'Papanasam', type: 'Basin', lat: 10.92, lng: 79.25, icon: Droplets, tempMod: 1.5, rain: 25.0, wind: 10 },
  { id: 'tn-2', state: 'Tamil Nadu', panchayat: 'Ketti', block: 'Coonoor', type: 'Hilltop', lat: 11.37, lng: 76.73, icon: Mountain, tempMod: -10.0, rain: 20.0, wind: 15 },
  { id: 'tn-3', state: 'Tamil Nadu', panchayat: 'Valparai', block: 'Pollachi', type: 'Plateau', lat: 10.32, lng: 76.95, icon: Landmark, tempMod: -1.0, rain: 5.0, wind: 22 },
  { id: 'tn-4', state: 'Tamil Nadu', panchayat: 'Usilampatti', block: 'Madurai', type: 'Plains', lat: 9.96, lng: 77.79, icon: Sun, tempMod: 3.5, rain: 0.0, wind: 8 },
  { id: 'tn-5', state: 'Tamil Nadu', panchayat: 'Sathyamangalam', block: 'Erode', type: 'Forest', lat: 11.50, lng: 77.24, icon: TreePine, tempMod: 2.0, rain: 12.0, wind: 9 },
  { id: 'kl-1', state: 'Kerala', panchayat: 'Vattavada', block: 'Devikulam', type: 'Hilltop', lat: 10.15, lng: 77.16, icon: Mountain, tempMod: -8.0, rain: 35.0, wind: 12 },
  { id: 'kl-2', state: 'Kerala', panchayat: 'Kainakary', block: 'Kuttanad', type: 'Coastal', lat: 9.50, lng: 76.38, icon: Waves, tempMod: 0.5, rain: 45.0, wind: 18 },
  { id: 'kl-3', state: 'Kerala', panchayat: 'Thirunelly', block: 'Mananthavady', type: 'Forest', lat: 11.85, lng: 75.99, icon: TreePine, tempMod: -4.0, rain: 28.0, wind: 8 },
  { id: 'kl-4', state: 'Kerala', panchayat: 'Attappadi', block: 'Mannarkkad', type: 'Ghat Pass', lat: 11.08, lng: 76.54, icon: TrendingDown, tempMod: 2.0, rain: 12.0, wind: 25 },
  { id: 'kl-5', state: 'Kerala', panchayat: 'Kumarakom', block: 'Kottayam', type: 'Basin', lat: 9.61, lng: 76.43, icon: Droplets, tempMod: 1.2, rain: 30.0, wind: 14 },

  // --- RAJASTHAN & GUJARAT (12) ---
  { id: 'rj-1', state: 'Rajasthan', panchayat: 'Pokhran', block: 'Pokhran', type: 'Lowland', lat: 26.92, lng: 71.91, icon: Sun, tempMod: 6.0, rain: 0.0, wind: 15 },
  { id: 'rj-2', state: 'Rajasthan', panchayat: 'Jhadol', block: 'Udaipur', type: 'Valley', lat: 24.38, lng: 73.49, icon: Waves, tempMod: -1.5, rain: 5.0, wind: 8 },
  { id: 'rj-3', state: 'Rajasthan', panchayat: 'Oriya', block: 'Abu Road', type: 'Hilltop', lat: 24.61, lng: 72.74, icon: Mountain, tempMod: -7.0, rain: 12.0, wind: 14 },
  { id: 'rj-4', state: 'Rajasthan', panchayat: 'Digod', block: 'Kota', type: 'Riverside', lat: 25.18, lng: 76.10, icon: Activity, tempMod: 2.5, rain: 2.0, wind: 6 },
  { id: 'rj-5', state: 'Rajasthan', panchayat: 'Rawatsar', block: 'Hanumangarh', type: 'Farmland', lat: 29.27, lng: 74.81, icon: Sprout, tempMod: 4.5, rain: 0.0, wind: 10 },
  { id: 'gj-1', state: 'Gujarat', panchayat: 'Nakhatrana', block: 'Nakhatrana', type: 'Plains', lat: 23.35, lng: 69.25, icon: Sun, tempMod: 5.0, rain: 0.0, wind: 18 },
  { id: 'gj-2', state: 'Gujarat', panchayat: 'Olpad', block: 'Surat', type: 'Coastal', lat: 21.32, lng: 72.74, icon: Droplets, tempMod: 1.0, rain: 15.0, wind: 22 },
  { id: 'gj-3', state: 'Gujarat', panchayat: 'Sasan', block: 'Talala', type: 'Forest', lat: 21.16, lng: 70.59, icon: TreePine, tempMod: 0.5, rain: 5.0, wind: 8 },
  { id: 'gj-4', state: 'Gujarat', panchayat: 'Subir', block: 'Dang', type: 'Hilltop', lat: 20.82, lng: 73.73, icon: Mountain, tempMod: -4.5, rain: 20.0, wind: 16 },
  { id: 'gj-5', state: 'Gujarat', panchayat: 'Malia', block: 'Morbi', type: 'Basin', lat: 23.09, lng: 70.73, icon: Leaf, tempMod: 3.0, rain: 2.0, wind: 25 },

  // --- BIHAR & UP (8) - Gangetic Belt ---
  { id: 'bh-1', state: 'Bihar', panchayat: 'Areer', block: 'Benipatti', type: 'Plains', lat: 26.43, lng: 85.98, icon: Wheat, tempMod: 2.0, rain: 12.0, wind: 7 },
  { id: 'bh-2', state: 'Bihar', panchayat: 'Supaul', block: 'Biraul', type: 'Basin', lat: 25.92, lng: 86.20, icon: Droplets, tempMod: 1.5, rain: 35.0, wind: 14 },
  { id: 'bh-3', state: 'Bihar', panchayat: 'Narkatiaganj', block: 'Narkatiaganj', type: 'Forest', lat: 27.10, lng: 84.47, icon: TreePine, tempMod: -1.0, rain: 22.0, wind: 6 },
  { id: 'bh-4', state: 'Bihar', panchayat: 'Katoria', block: 'Banka', type: 'Plateau', lat: 24.63, lng: 86.69, icon: Landmark, tempMod: 2.5, rain: 5.0, wind: 10 },
  { id: 'up-1', state: 'Uttar Pradesh', panchayat: 'Jayapur', block: 'Arajiline', type: 'Farmland', lat: 25.26, lng: 82.85, icon: Sprout, tempMod: 3.5, rain: 2.0, wind: 8 },
  { id: 'up-2', state: 'Uttar Pradesh', panchayat: 'Chopan', block: 'Robertsganj', type: 'Hilltop', lat: 24.51, lng: 83.03, icon: Mountain, tempMod: -2.5, rain: 10.0, wind: 15 },
  { id: 'up-3', state: 'Uttar Pradesh', panchayat: 'Lakhimpur', block: 'Lakhimpur', type: 'Forest', lat: 27.95, lng: 80.77, icon: TreePine, tempMod: -1.5, rain: 18.0, wind: 9 },
  { id: 'up-4', state: 'Uttar Pradesh', panchayat: 'Bhognipur', block: 'Kanpur Dehat', type: 'Plains', lat: 26.17, lng: 79.91, icon: Wheat, tempMod: 4.2, rain: 0.0, wind: 12 },
];

const generateAlerts = (node) => {
  const alerts = [];
  
  if (node.rain > 30) {
    alerts.push({ 
      type: 'critical', 
      title: 'PostGIS Flood Alert', 
      titleHi: 'पोस्टजीआईएस बाढ़ चेतावनी',
      message: `30m DEM inference shows orographic pooling. 35mm rain expected. Suspend irrigation immediately.`,
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
      titleHi: 'तेज हवाओं की गति',
      message: `Valley funneling detected. Wind speeds up to ${node.wind}km/h. Secure tall crops.`,
      messageHi: `घाटी फ़नलिंग का पता चला। हवा की गति ${node.wind} किमी/घंटा तक। लंबी फसलों को सुरक्षित करें।`
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: 'success',
      title: 'Optimal Conditions',
      titleHi: 'अनुकूल स्थितियाँ',
      message: 'Microclimate remains stable. Normal agricultural activities can proceed as planned.',
      messageHi: 'सूक्ष्म-जलवायु स्थिर है। सामान्य कृषि गतिविधियाँ योजना के अनुसार जारी रह सकती हैं।'
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
    name: `${node.panchayat} Panchayat`,
      terrainType: node.type,
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
    name: `${node.panchayat} Panchayat`,
    block: `${node.block} Block`
  };

  if (!stateMap[node.state]) stateMap[node.state] = [];
  stateMap[node.state].push({
    id: node.id,
    label: `${node.panchayat} Panchayat`,
    block: `${node.block} Block`,
    type: node.type,
    Icon: node.icon,
    tooltip: `Downscaled from ${node.block} Block`
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
