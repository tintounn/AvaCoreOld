const http = require('http');
const fs = require('fs');
const urlParse = require('url').parse;
const request = require('request');

class DownloadService {
  constructor() { 
    this.nbDownloadInProgress = 0;
    this.queue = [];
  }

  download(file) {
    this.queue.push(file);
    this.process();
  }

  process() {
    if(this.nbDownloadInProgress < 5 && this.queue.length > this.nbDownloadInProgress) {
      let download =  Object.create(this.queue[this.nbDownloadInProgress]);
      this.nbDownloadInProgress++;

      let writeStream = fs.createWriteStream(download.file.path);
      let lastInterval = 0, downloaded = 0, progressInterval;
      let options = { method:'get', url: download.file.url };
      let req = request(options);

      req.on('data', (chunck) => {
        writeStream.write(chunck);
        downloaded+=chunck.length;
      });

      progressInterval = setInterval(() => {
        let intervalDiff = downloaded - lastInterval;
        lastInterval = downloaded;

        let speed = intervalDiff;
        let progression = (100.0 * downloaded / download.file.size).toFixed(2);

        ava.admins.emit('download:progression', {_id: download.file._id, speed: speed, progression: progression});
      }, 1000);

      writeStream.on('finish', () => {
        ava.log.info('Finish');
        writeStream.close();
        this.next(download);
        clearInterval(progressInterval);
      });

      /** Network error */
      req.on('error', (err) => {
        ava.log.error(err);
        fs.unlink(download.file.path);
        this.next(download);
        clearInterval(progressInterval);
      });

      /** WriteStream error */
      writeStream.on('error', (err) => {
        ava.log.error(err);
        fs.unlink(download.file.path);
        this.next(download);
        clearInterval(progressInterval);
      });

    } else {
      console.log('Download queue full !');
    }
  }

  onDownloadProgress(progress) {
    console.log(progress);
  }

  getDownloadHeader(url) {
    return new Promise((resolve, reject) => {
      request.head(url, (err, res) => {
        if(err) {
          return reject(err);
        }

        let size = res.headers['content-length'];
  
        let urls = url.split('/');
        let name = urls[urls.length - 1];
  
        resolve({size: size, name: name});
      }).on('error', (err) => {
        //ava.log.error(err);
        reject(err);
      });
    });
  }

  next(last) {
    if(last) {
      for(let i = 0; i < this.queue.length; i++) {
        if(this.queue[i]._id == last._id) {
          this.queue.splice(i, 1);
        }
      }
    }

    this.nbDownloadInProgress--;
    this.process();
  }

}

module.exports = DownloadService;