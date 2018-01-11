const Schema = require('mongoose').Schema;

module.exports = {
  name: "Movie",
  schema: {
    file: { type: Schema.Types.ObjectId, ref: 'File' },
  }
};