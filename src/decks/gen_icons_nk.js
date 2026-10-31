const React=require('react'),RDS=require('react-dom/server'),sharp=require('sharp'),fa=require('react-icons/fa');
const ICONS={utensils:'FaUtensils',clock:'FaClock',users:'FaUsers',fire:'FaFire',chartline:'FaChartLine',
chartbar:'FaChartBar',search:'FaSearch',sitemap:'FaSitemap',clipboard:'FaClipboardList',checkcircle:'FaCheckCircle',
exclamation:'FaExclamationTriangle',bolt:'FaBolt',cogs:'FaCogs',flask:'FaFlask',bullseye:'FaBullseye',
database:'FaDatabase',filter:'FaFilter',usercheck:'FaUserCheck',calendar:'FaCalendarAlt',comments:'FaComments',
redo:'FaRedo',tachometer:'FaTachometerAlt',bell:'FaConciergeBell',receipt:'FaReceipt',hourglass:'FaHourglassHalf',
stopwatch:'FaStopwatch',lightbulb:'FaLightbulb',rocket:'FaRocket',shield:'FaShieldAlt',ruler:'FaRulerCombined',
chair:'FaChair',stream:'FaStream',balance:'FaBalanceScale',layers:'FaLayerGroup'};
(async()=>{for(const[n,c]of Object.entries(ICONS)){
const svg=RDS.renderToStaticMarkup(React.createElement(fa[c],{size:256,color:'#FFFFFF'}));
const inner=svg.replace(/<svg[^>]*>|<\/svg>/g,'');
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="256" height="256" fill="#FFFFFF">${inner}</svg>`))
 .resize(256,256).png().toFile(`icons/${n}.png`);}
console.log('icons:',Object.keys(ICONS).length);})();
