class Device {
  constructor(nodeId, categories, gateway, location) {
    this.nodeId = nodeId;
    this.categories = categories;
    this.gateway = gateway;
    this.location = location;
  }
}

module.exports = Device;