const Schema = require('mongoose').Schema;

module.exports = {
  name: "File",
  schema: {
    name: String,
    url: String,
    size: Number,
    path: String,
    parent: { type: Schema.Types.ObjectId, ref: 'Folder' }
  }
};