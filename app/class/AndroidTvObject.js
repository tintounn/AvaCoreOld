const Device = require('./Device');

class AndroidTvObject extends Device {
  constructor(nodeId, gateway, location) {
    super(nodeId, ['TV'], gateway, location);
  }

  play(url) {
    this.gateway.sendValue('play', url);
  }

  stop() {
    this.gateway.sendValue('stop');
  }
}

module.exports = AndroidTvObject;