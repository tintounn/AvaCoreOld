const Colors = require('colors');
const fs = require('fs');

class Log {

  constructor() {}

  error(msg) {
    console.log(Colors.red('[error]') + msg);
    fs.appendFileSync('./logs/errors.txt', '[error]' + msg + '\r\n', {encoding: 'utf-8'});
  }

  warning(msg) {
    console.log(Colors.yellow('[warning]') + msg);
    fs.appendFileSync('./logs/errors.txt', '[warning]' + msg + '\r\n', {encoding: 'utf-8'});
  }

  success(msg) {
    console.log(Colors.green('[success]') + msg);
    fs.appendFileSync('./logs/success.txt', '[success]' + msg + '\r\n', {encoding: 'utf-8'});
  }

  info(msg) {
    console.log(Colors.blue('[info]') + msg);
    fs.appendFileSync('./logs/success.txt', '[info]' + msg + '\r\n', {encoding: 'utf-8'});
  }

}

module.exports = Log;