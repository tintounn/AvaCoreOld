/*const DownloadService = require('./app/services/DownloadService');
const path = require('path');

let downloadService = new DownloadService();
downloadService.getDownloadHeader("https://www.google.fr/").catch((err) => {console.log(err)});*/
//downloadService.download({url: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4', path: path.join(__dirname, 'files', 'test.mp4')});

const disk = require('diskusage');
const drivelist = require('drivelist');

drivelist.list((err, lst) => {
  console.log(lst);
});
