const Schema = require('mongoose').Schema;

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
        Movie.remove({file: this._id}).exec();
        next();
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