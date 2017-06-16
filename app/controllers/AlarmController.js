class AlarmController {
  static routes() {
    return {
      'post /api/rooms/:roomId/alarms': AlarmController.create,
      'get /api/rooms/:roomId/alarms': AlarmController.findAll,
      'get /api/rooms/:roomId/alarms/:id': AlarmController.findOne,
      'delete /api/rooms/:roomId/alarms/:id': AlarmController.delete,
      'put /api/rooms/:roomId/alarms/:id': AlarmController.update,
    }
  }

  static create(req, res) {
    let roomId = req.params.roomId;
    let data = req.body;

    data.roomId = roomId;
    data.days = data.days.toString();
    Alarm.create(data).then((alarm) => {
      res.status(200).json({alarm: alarm});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static update(req, res) {

  }

  static delete(req, res) {

  }

  static findOne(req, res) {

  }

  static findAll(req, res) {
    let roomId = req.params.roomId;

    Alarm.findAll({where: {roomId: roomId}}).then((alarms) => {
      res.status(200).json({alarms: alarms});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}

module.exports = AlarmController;