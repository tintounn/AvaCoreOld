'use strict'

const ZwaveObject = require('../../Device');

class Zipato0x0002 extends Device {
  constructor(nodeId, gateway, location) {
    super(nodeId, ['Lamp', 'RGBLamp'], gateway, location);
    this.color = '#000000';
    this.actions = {
      'setCustomColor': {
        type: 'color',
        method: 'setCustomColor'
      },
      'on': {
        type: 'button',
        method: 'on'
      },
      'off': {
        type: 'button',
        method: 'off'
      }
    };
  }

  on() {
    this.setDefinedColor('Warm White');
  }

  off() {
    this.setDefinedColor('Off');
  }

  setCustomColor(color) {
    this.gateway.sendValue(this.nodeId, 51, 1, 0, color);
  }

  setDefinedColor(color) {
    this.gateway.sendValue(this.nodeId, 51, 1, 1, color);
  }

  refreshValues() {

  }
}

module.exports = Zipato0x0002;