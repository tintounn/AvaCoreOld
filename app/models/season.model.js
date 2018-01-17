const Schema = require('mongoose').Schema;

module.exports = {
  name: "Season",
  schema: {
    number: Number,
    image: String,
    firstAirDate: String,
    folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
    episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode' }],
    serie: { type: Schema.Types.ObjectId, ref: 'Serie' },
  },
  hooks: [
    {
      type: 'pre', action: 'remove', func: function(next) {   
        this.folder.remove().then(() => {
          return Episode.find({season: this._id});
        }).then((episodes) => {
          async.eachOfSeries(episodes, (episode, key, cb) => {
            episode.remove().then(() => cb()).catch((err) => next(new Error(err)));
          }, () => {
            next();
          });
        }).catch((err) => {
          next(new Error(err));
        });
      }
    }
  ]
};