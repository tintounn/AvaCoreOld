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
      let download =  this.queue[this.nbDownloadInProgress];
      this.nbDownloadInProgress++;

      let writeStream = fs.createWriteStream(download.path);;
      let lastInterval = 0, downloaded = 0, progressInterval;
      let options = { method:'get', url: download.url };
      let req = request(options);

      req.on('data', (chunck) => {
        writeStream.write(chunck);
        downloaded+=chunck.length;
      });

      progressInterval = setInterval(() => {
        let intervalDiff = downloaded - lastInterval;
        lastInterval = downloaded;

        let speed = intervalDiff;
        let progression = (100.0 * downloaded / download.size).toFixed(2);

        ava.admins.emit('download:progression', {_id: download._id, speed: speed, progression: progression});
      }, 1000);

      req.on('end', (err) => {
        if(!err) {
          ava.log.info(download.name + " downloaded.");
          writeStream.end();
          this.next(download);
          clearInterval(progressInterval);
  
          ava.admins.emit('download:finish', {_id: download._id});
          Notificationservice.send('success', download.name + ' is downloaded !');
        }
      });

      /** Network error */
      req.on('error', (err) => {
        writeStream.end();
        this.onDownloadError(download, err);
        this.next(download);
        clearInterval(progressInterval);
      });

      /** WriteStream error */
      writeStream.on('error', (err) => {
        req.abort();
        clearInterval(progressInterval);
        this.onDownloadError(download, err);
        this.next(download);
      });

    }
  }

  onDownloadError(download, err) {
    ava.log.error(err);
    Notificationservice.send('danger', 'Error when downloading ' + download.name + ' see log for more detail');

    download.remove();
    fs.unlink(download.path, (err) => {
      ava.log.warning(err);
    });
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