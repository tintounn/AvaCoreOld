const Device = require('./Device');

class ZwaveObject extends Device {
  constructor(nodeId, categories, gateway, location) {
    super(nodeId, categories, gateway, location);
    this.values = {};
  }

  sendValue(id, value) {
    if(!this.values[id]) return;
    this.values[id].value = value;

    this.gateway.sendValue(this.nodeId, this.values[id].classId, this.values[id].instance, this.values[id].index, value);
  }

  setLocation(location) {
    this.location = location;
    this.gateway.setNodeLocation(this.nodeId, location);
  }
}

module.exports = ZwaveObject;


