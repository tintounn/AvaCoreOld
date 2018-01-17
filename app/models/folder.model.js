const Schema = require('mongoose').Schema;
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "Folder",
  schema: {
    name:  String,
    lowerName: String,
    path: String,
    parent: { type: Schema.Types.ObjectId, ref: 'Folder' },
    folders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }]
  },
  hooks: [
    {
      type: 'pre', action: 'remove', func: function(next) {
        fs.rmdir(this.path, (err) => {
          if(err) {
            ava.log.warning(err);
          }

          next();
        });
      }
    },
    {
      type: 'pre', action: 'save', func: function(next) {
        this.path = path.join(ava.config.get('nas:root'), ava.config.get('nas:series'), '/', this.name);
        this.lowerName = this.name.toLowerCase();
        fs.mkdir(this.path, (err) => {
          if(err) {
            next(new Error(err));
          } else {
            next();
          }
        });
      }
    }
  ]
};