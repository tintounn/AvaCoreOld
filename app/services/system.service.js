const disk = require('diskusage');
const os = require('os');
const drivelist = require('drivelist');

class SystemService {
  constructor() {}

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
    return {
      cpus: os.cpus(),
      freemem: os.freemem(),
      totalmem: os.totalmem()
    };
  }

  getNetworkInfo() {
    return os.networkInterfaces();
  }
}

module.exports = SystemService;

