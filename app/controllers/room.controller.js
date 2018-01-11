const Mongoose = require('mongoose');

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

    let room = new Room(data);
    room.save().then((room) => {
      res.status(201).json({room: room});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static update(req, res) {
    let id = req.params.id;
    let data = req.body;

    delete data.id;
    Room.FindOneAndUpdate({_id: id}, data).then((room) => {
      res.status(201).json({room: room});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static delete(req, res) {
    let id = req.params.id;

    Room.remove({_id: id}).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static findOne(req, res) {
    let id = req.params.id;

    Room.findById(id).populate('alarms').then((room) => {
      res.status(200).json({room: room});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static findAll(req, res) {
    Room.find().then((rooms) => {
      console.log(rooms);
      res.status(200).json({rooms: rooms});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}

module.exports = RoomController;