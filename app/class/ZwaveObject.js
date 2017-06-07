
class ZwaveObject {
  constructor(nodeId, nodeInfo, categories) {
    this.nodeId = nodeId;
    this.nodeInfo = nodeInfo;
    this.categories = categories;
    this.values = {};
  }

  sendValue(id, value) {
    if(!this.values[id]) return;
    this.values[id].value = value;

    ava.zwaveGateway.sendValue(this.nodeId, this.values[id].classId, this.values[id].instance, this.values[id].index, value);
  }

  get location() {
    return this.nodeInfo.loc;
  }

  setLocation(location) {
    this.nodeInfo['loc'] = location;
    ava.zwaveGateway.setNodeLocation(this.nodeId, location);
  }
}

module.exports = ZwaveObject;


