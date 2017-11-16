const Schema = require('mongoose').Schema;

module.exports = {
  name: "rooms",
  schema: {
    _id: Schema.Types.ObjectId,
    name:  String,
    image: String,
    alarms: [{ type: Schema.Types.ObjectId, ref: 'Alarm' }]
  }
};