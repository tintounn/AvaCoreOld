const Schema = require('mongoose').Schema;

module.exports = {
  name: "Alarm",
  schema: {
    name:  String,
    time: String,
    days: String,
    room: { type: Schema.Types.ObjectId, ref: 'Room' },
  },
  hooks: []
};