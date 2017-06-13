const http = require('http');
const fs = require('fs');
const urlParse = require('url').parse;

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
        if(this.nbDownloadInProgress < 5 && this.queue.length > 0) {
            this.nbDownloadInProgress++;
            let file = this.queue.shift();

            let writeStream = fs.createWriteStream(file.path);
            let request = http.get(file.url, (res) => {
               res.pipe(writeStream);
               writeStream.on('finish', () => {
                  writeStream.close();
                  this.next();
               });
            });

            /** Network error */
            request.on('error', () => {
                fs.unlink(file.path);
                this.next();
            });

            /** WriteStream error */
            writeStream.on('error', () => {
               fs.unlink(file.path);
               this.next();
            });
        } else {
            console.log('Download queue full !');
        }
    }

    getDownloadHeader(url) {
        return new Promise((resolve, reject) => {
            let options = {method: 'HEAD', hostname: url};
            http.request(options, (response) => {
                console.log(response.headers);
           }).on('error', (err) => {
               reject(err);
           });
        });
    }

    next() {
        this.nbDownloadInProgress--;
        this.process();
    }

}

module.exports = DownloadService;