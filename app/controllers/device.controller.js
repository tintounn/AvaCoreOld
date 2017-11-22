class DeviceController {
  static routes() {
    return {
      'get /api/devices/orphans': DeviceController.orphans,
      'get /api/rooms/:roomId/devices': DeviceController.findAll,
      'put /api/devices/:nodeId': DeviceController.setValue
    }
  }

  static orphans(req, res) {
    let objects = HomeService.getObjectsByRoom('');
    res.status(200).json({devices: objects});
  }

  static findAll(req, res) {
    let roomId = req.params.roomId;

    let objects = HomeService.getObjectsByRoom(roomId);
    res.status(200).json({devices: objects});
  }

  static findByCategory(req, res) {
    let category = req.params.category;
    let devices = ava.deviceManager.getDevicesByCategory(category);

    res.status(200).json({devices: devices});
  }

  static setValue(req, res) {
    let nodeId = req.params.nodeId;
    let method = req.body.method;
    let value = req.body.value;

    try {
      HomeService.deviceManager.getObjectByNodeId(nodeId)[method](value);
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({error: err});
    }
  }
}

module.exports = DeviceController;