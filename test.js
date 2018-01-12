const DownloadService = require('./app/services/download.service');
const path = require('path');

let downloadService = new DownloadService();
downloadService.getDownloadHeader("http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4").then((res) => console.log(res)).catch((err) => {console.log(err)});
//downloadService.download({url: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_30mb.mp4', path: path.join(__dirname, 'files', 'test.mp4')});


/*const SystemService = require('./app/services/system.service');

let srv = new SystemService();
srv.getPerformanceInfo().then((res) => {
  console.log(res);
});
*/