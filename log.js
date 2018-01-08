const Colors = require('colors');
const fs = require('fs');

class Log {

  constructor() {}

  error(msg) {
    this.log('error', 'red', msg);
  }

  warning(msg) {
    this.log('warning', 'yellow', msg);
  }

  success(msg) {
    this.log('success', 'green', msg);
  }

  info(msg) {
    this.log('info', 'blue', msg);
  }

  log(type, color, msg) {
    let date = new Date().toISOString();

    console.log(`[${date}]` + Colors[color](`[${type}]`) + msg);
    if(type == 'error' || type == 'warning') {
      fs.appendFileSync('./logs/errors.txt', `[${date}][${type}] ${msg} \r\n`, {encoding: 'utf-8'});
    } else {
      fs.appendFileSync('./logs/success.txt', `[${date}][${type}] ${msg} \r\n`, {encoding: 'utf-8'});
    }
  }
}

module.exports = Log;