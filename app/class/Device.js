class Device {
  constructor(nodeId, categories, gateway, location) {
    this.nodeId = nodeId;
    this.name = '';
    this.categories = categories;
    this.gateway = gateway;
    this.location = location;
    this.actions = [];
    this.props = {};
  }

  setLocation(location) {
    this.location = location;
    this.gateway.setNodeLocation(this.nodeId, location);
  }

  toJSON() {
    return {
      nodeId: this.nodeId,
      name: this.name,
      categories: this.categories,
      location: this.location,
      actions: this.actions,
      props: this.props
    };
  }
}

module.exports = Device;