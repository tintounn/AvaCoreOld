const Schema = require('mongoose').Schema;

module.exports = {
  name: "Room",
  schema: {
    name:  String,
    image: String,
    alarms: [{ type: Schema.Types.ObjectId, ref: 'Alarm' }]
  }
};