const Device = require('./Device');
const HotSpotCategory = require('./categories/hotspot.category');
const RGBCategory = require('./categories/rgb.category');

class HotSpotDevice extends Device {
  constructor(nodeId, gateway, location) {
    super(nodeId, ['Hotspot', 'RGB'], gateway, location);

    HotSpotCategory.import(this);
    RGBCategory.import(this);

    this.name = "HotSpot";
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

  on() {
    this.gateway.sendValue(this.nodeId, 'setColor', {r: 255, g: 255, b: 255});
  }

  off() {
    this.gateway.sendValue(this.nodeId, 'setColor', {r: 0, g: 0, b: 0});
  }

  setCustomColor(color) {
    this.gateway.sendValue(this.nodeId, 'setColor', color);
  }
}

module.exports = HotSpotDevice;