class RoomController {
  constructor() { }

  static routes() {
    return {
      'get /api/rooms': RoomController.findAll,
      'get /api/rooms/:id': RoomController.findOne,
      'post /api/rooms': RoomController.create,
      'put /api/rooms/:id': RoomController.update,
      'delete /api/rooms/:id': RoomController.delete
    }
  }

  static create(req, res) {
    let data = req.body;

    Room.create(data).then((room) => {
      res.status(200).json({room: room});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static update(req, res) {
    let id = req.params.id;
    let data = req.body;

    Room.findById(id).then((room) => {
      delete data.id;
      return room.update(data);
    }).then(() => {
      data.id = id;
      res.status(200).json({room: data});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static delete(req, res) {
    let id = req.params.id;

    Room.findById(id).then((room) => {
      room.destroy();
      res.sendStatus(200);
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static findOne(req, res) {
    let id = req.params.id;

    Room.findById(id).then((room) => {
      res.status(200).json({room: room});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static findAll(req, res) {
    Room.findAll().then((rooms) => {
      res.status(200).json({rooms: rooms});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}

module.exports = RoomController;