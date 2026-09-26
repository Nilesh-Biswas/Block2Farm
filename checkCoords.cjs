
const fs = require('fs');
const content = fs.readFileSync('src/data/mockData.jsx', 'utf8');
const match = content.match(/const RAW_NODES = \[([\s\S]*?)\];/);
if (match) {
  const nodesCode = '[' + match[1] + ']';
  const nodes = eval(nodesCode.replace(/icon: [a-zA-Z]+/g, 'icon: \'icon\''));
  console.log('Total nodes:', nodes.length);
  nodes.forEach(n => {
    if (n.lat > 21 && n.lat < 26.6 && n.lng > 88.5 && n.lng < 92.5) {
      console.log('Possible Bangladesh:', n.id, n.state, n.panchayat, n.lat, n.lng);
    }
    if (n.lat > 26.3 && n.lat < 30.5 && n.lng > 80 && n.lng < 88.2) {
      console.log('Possible Nepal:', n.id, n.state, n.panchayat, n.lat, n.lng);
    }
    if (n.lat > 24 && n.lat < 34 && n.lng < 74) {
      console.log('Possible Pakistan/West:', n.id, n.state, n.panchayat, n.lat, n.lng);
    }
  });
}

