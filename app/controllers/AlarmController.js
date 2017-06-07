class AlarmController {
  static routes() {
    return {
      'post /api/rooms/:roomId/alarms': AlarmController.create,
      'get /api/rooms/:roomId/alarms': AlarmController.findAllByRoom,
      'get /api/rooms/:roomId/alarms/:id': AlarmController.findOne,
      'delete /api/rooms/:roomId/alarms/:id': AlarmController.delete,
      'put /api/rooms/:roomId/alarms/:id': AlarmController.update,
    }
  }

  static create(req, res) {

  }

  static update(req, res) {

  }

  static delete(req, res) {

  }

  static findOne(req, res) {

  }

  static findAllByRoom(req, res) {

  }

}

module.exports = AlarmController;