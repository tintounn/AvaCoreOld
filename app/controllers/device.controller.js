class DeviceController {
  static routes() {
    return {
      'get /api/devices': DeviceController.findAll,
      'put /api/devices/:nodeId': DeviceController.setValue
    }
  }

  static findAll(req, res) {
    res.status(200).json({devices: Homeservice.deviceManager.devices});
  }

  static setValue(req, res) {
    let nodeId = req.params.nodeId;
    let method = req.body.method;
    let value = req.body.value;

    try {
      Homeservice.deviceManager.getObjectByNodeId(nodeId)[method](value);
      return res.sendStatus(200);
    } catch (err) {
      return res.status(500).json({error: err});
    }
  }
}

module.exports = DeviceController;