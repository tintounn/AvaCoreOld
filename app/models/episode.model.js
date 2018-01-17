const Schema = require('mongoose').Schema;
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "Episode",
  schema: {
    number: Number,
    image: String,
    file: { type: Schema.Types.ObjectId, ref: 'File' },
    season: { type: Schema.Types.ObjectId, ref: 'Season' },
  },
  hooks: [
    {
      type: 'pre', action: 'remove', func: function(next) {   
        this.file.remove().then(() => {
          next();
        }).catch((err) => {
          next(new Error(err));
        })
      }
    }
  ]
};