const Device = require('./Device');

class AndroidTvObject extends Device {
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
    this.gateway.sendValue('play', url);
  }

  stop() {
    this.gateway.sendValue('stop');
  }

  refreshValues() {
    
  }
}

module.exports = AndroidTvObject;