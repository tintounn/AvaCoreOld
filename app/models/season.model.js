const Schema = require('mongoose').Schema;

module.exports = {
  name: "Season",
  schema: {
    number: Number,
    image: String,
    firstAirDate: String,
    folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
    serie: { type: Schema.Types.ObjectId, ref: 'Serie' },
  },
  hooks: []
};