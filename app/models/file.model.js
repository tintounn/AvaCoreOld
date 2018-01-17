const Schema = require('mongoose').Schema;
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "File",
  schema: {
    name: String,
    lowerName: String,
    url: String,
    size: Number,
    path: String,
    parent: { type: Schema.Types.ObjectId, ref: 'Folder' }
  },
  hooks: [
    {
      type: 'pre', action: 'remove', func: function(next) {
        fs.unlink(this.path, (err) => {
          if(err) {
            ava.log.warning(err);
          }

          next();
        });
      }
    },
    {
      type: 'pre', action: 'save', func: function(next) {
        this.lowerName = this.name.toLowerCase();
        next();
      }
    }
  ]
};