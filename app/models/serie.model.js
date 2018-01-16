const Schema = require('mongoose').Schema;

module.exports = {
  name: "Serie",
  schema: {
    name:  String,
    image: String,
    description: String,
    popularity: Number,
    firstAirDate: String,
    seasons: [{ type: Schema.Types.ObjectId, ref: 'Season' }],
    folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
  },
  hooks: []
};