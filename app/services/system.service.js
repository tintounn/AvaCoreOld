const disk = require('diskusage');
const os = require('os');
const drivelist = require('drivelist');

class SystemService {
  constructor() {}

  init() {

  }

  getHardDriveInfo() {
    return new Promise((resolve, reject) => {
      try {
        let mountpoints = [];
        drivelist.list((err, drives) => {
          if(err) {
            throw new Error(err);
          }

          for(let item of drives) {
            for(let mnt of item.mountpoints) {
              mountpoints.push({
                sizes: disk.checkSync(mnt.path),
                description: item.description,
                path: mnt.path
              });
            }
          }
  
          resolve(mountpoints);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  getPerformanceInfo() {
    return new Promise((resolve, reject) => {
      let start = this.getCpuUsage();
      setTimeout(() => {
        let end = this.getCpuUsage();
  
        let idleDifference = end.idle - start.idle;
        let totalDifference = end.total - start.total;
        let percent = (1 - (idleDifference / totalDifference)) * 100;

        resolve({
          cpu: {usage: percent, model: os.cpus()[0].model, speed: os.cpus()[0].speed},
          freemem: os.freemem(),
          totalmem: os.totalmem()
        });
      }, 100);
    });
  }

  getCpuUsage() {
    let cpus = os.cpus();
    let totalIdle = 0, totalTick = 0;

    for(let cpu of cpus) {
      for(let type in cpu.times) {
        totalTick += cpu.times[type];
      }

      totalIdle += cpu.times.idle;
    }

    return {idle: totalIdle/cpus.length, total: totalTick/cpus.length};
  }

  getNetworkInfo() {
    return os.networkInterfaces();
  }
}

module.exports = SystemService;

