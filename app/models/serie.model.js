const Schema = require('mongoose').Schema;
const async = require('async');

module.exports = {
  name: "Serie",
  schema: {
    image: String,
    description: String,
    popularity: Number,
    firstAirDate: String,
    seasons: [{ type: Schema.Types.ObjectId, ref: 'Season' }],
    folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
  },
  hooks: [
    {
      type: 'pre', action: 'remove', func: function(next) {   
        this.folder.remove().then(() => {
          return Season.find({serie: this._id});
        }).then((seasons) => {
          async.eachOfSeries(seasons, (season, key, cb) => {
            season.remove().then(() => cb()).catch((err) => next(new Error(err)));
          }, () => {
            next();
          });
        }).catch((err) => {
          next(new Error(err));
        });
      }
    },
  ]
};
