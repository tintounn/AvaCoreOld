const Device = require('./Device');

class AndroidTvDevice extends Device {
  constructor(nodeId, gateway, location) {
    super(nodeId, ['TV'], gateway, location);
    this.urlPlayed = '';
    this.actions = {
      'play': {
        type: 'text',
        method: 'play'
      },
      'stop': {
        type: 'button',
        method: 'stop'
      }
    };
  }

  play(url) {
    this.gateway.sendValue(this.nodeId, 'play', url);
  }

  stop() {
    this.gateway.sendValue(this.nodeId, 'stop');
  }

  refreshValues() {
    
  }
}

module.exports = AndroidTvDevice;