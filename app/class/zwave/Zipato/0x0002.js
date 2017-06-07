'use strict'

const ZwaveObject = require('../../ZwaveObject');

class Zipato0x0002 extends ZwaveObject {
  constructor(nodeId, nodeInfo) {
    super(nodeId, nodeInfo, ['RGBLamp']);
    this.values = {
      "51-1-0": {
        "name": "Color",
        "classId": 51,
        "instance": 1,
        "index": 0,
        "type": "color",
        "value": "#000000"
      },
      "51-1-1": {
        "name": "Color",
        "classId": 51,
        "instance": 1,
        "index": 1,
        "type": "select",
        "values": ["Off", "Cool White", "Warm White", "Red", "Blue", "Green"],
        "value": "Off"
      },
    };

    //this.off();
  }

  on() {
    this.sendValue('51-1-1', 'Warm White');
  }

  off() {
    this.sendValue('51-1-1', 'Off');
  }

  setColor(color) {
    this.sendValue('51-1-1', color);
  }

  getColor() {
    return this.values['51-1-1']['value'];
  }
}

module.exports = Zipato0x0002;