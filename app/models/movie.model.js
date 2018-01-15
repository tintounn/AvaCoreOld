const Schema = require('mongoose').Schema;

module.exports = {
  name: "Movie",
  schema: {
    image: String,
    releaseDate: String,
    popularity: Number,
    description: String,
    file: { type: Schema.Types.ObjectId, ref: 'File' },
  },
  hooks: []
};