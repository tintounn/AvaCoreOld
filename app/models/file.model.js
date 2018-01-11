const Schema = require('mongoose').Schema;

module.exports = {
  name: "File",
  schema: {
    name: String,
    size: String,
    parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
  }
};