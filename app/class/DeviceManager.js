class DeviceManager {
  constructor() {
    this.devices = [];
  }

  add(device) {
    this.devices.push(device);
  }

  remove(nodeId) {
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i].nodeId == nodeId) {
        this.devices.splice(i, 1);
        break;
      }
    }
  }

  /**
   *
   * @param nodeId
   * @returns {*}
   */
  getDeviceByNodeId(nodeId) {
    for (let device of this.devices) {
      if (device.nodeId == nodeId) {
        return device;
      }
    }
  }

  /**
   *
   * @param categories
   * @returns {Array}
   */
  getDevicesByCategories(categories) {
    let devices = [];

    for (let category of categories) {
      devices = devices.concat(this.getDevicesByCategory(category));
    }

    return devices;
  }

  /**
   *
   * @param category
   * @returns {Array}
   */
  getDevicesByCategory(category) {
    let devices = [];

    for (let device of this.devices) {
      for (let cat of device.categories) {
        if (cat == category) {
          devices.push(device);
        }
      }
    }

    return devices;
  }

}

module.exports = DeviceManager;