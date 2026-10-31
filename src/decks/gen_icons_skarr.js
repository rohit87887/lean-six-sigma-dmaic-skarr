const React=require('react');
const RDS=require('react-dom/server');
const sharp=require('sharp');
const fa=require('react-icons/fa');
const ICONS={table:'FaTable',calculator:'FaCalculator',chartbar:'FaChartBar',exclamation:'FaExclamationTriangle',
filter:'FaFilter',shield:'FaShieldAlt',usercheck:'FaUserCheck',clock:'FaClock',flask:'FaFlask',
sitemap:'FaSitemap',cogs:'FaCogs',checkcircle:'FaCheckCircle',chartline:'FaChartLine',search:'FaSearch',
clipboard:'FaClipboardList',redo:'FaRedo',bolt:'FaBolt',balance:'FaBalanceScale',layers:'FaLayerGroup',
database:'FaDatabase'};
(async()=>{for(const[n,c]of Object.entries(ICONS)){
const svg=RDS.renderToStaticMarkup(React.createElement(fa[c],{size:256,color:'#FFFFFF'}));
const inner=svg.replace(/<svg[^>]*>|<\/svg>/g,'');
const full=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="256" height="256" fill="#FFFFFF">${inner}</svg>`;
await sharp(Buffer.from(full)).resize(256,256).png().toFile(`icons/${n}.png`);}
console.log('icons done');})();
