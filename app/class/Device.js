class Device {
  constructor(nodeId, categories, gateway, location) {
    this.nodeId = nodeId;
    this.categories = categories;
    this.gateway = gateway;
    this.location = location;
    this.locked = false;
  }

  lock() {
    //Socket here
    this.locked = true;
  }

  unlock() {
    //Socket here
    this.locked = false;
  }

  setLocation(location) {
    this.location = location;
    this.gateway.setNodeLocation(this.nodeId, location);
  }
}

module.exports = Device;