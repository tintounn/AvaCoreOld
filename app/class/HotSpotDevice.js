const Device = require('./Device');

class HotSpotDevice extends Device {
  constructor(nodeId, gateway, location) {
    super(nodeId, ['Hotspot'], gateway, location);
    this.urlPlayed = '';
    this.actions = {
      'play': {
        type: 'text',
        method: 'play'
      },
      'say': {
        type: 'text',
        method: 'say'
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

  say(msg) {
    this.gateway.sendValue(this.nodeId, 'say', msg);
  }

  stop() {
    this.gateway.sendValue(this.nodeId, 'stop');
  }

  refreshValues() {
    
  }
}

module.exports = HotSpotDevice;