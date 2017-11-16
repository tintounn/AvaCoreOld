const Schema = require('mongoose').Schema;

module.exports = {
  name: "alarms",
  schema: {
    _id: Schema.Types.ObjectId,
    name:  String,
    time: String,
    days: String,
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
  }
};