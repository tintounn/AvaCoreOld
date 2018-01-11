const Schema = require('mongoose').Schema;

module.exports = {
  name: "Folder",
  schema: {
    name:  String,
    path: String,
    parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
    folders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }]
  }
};