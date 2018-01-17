const path = require('path');

class SeasonController {
  static routes() {
    return {
      'post /api/series/:serieId/seasons': SeasonController.create,
      'get /api/series/:serieId/seasons': SeasonController.findAll,
      'get /api/series/:serieId/seasons/:seasonId': SeasonController.findOne,
      'delete /api/series/:serieId/seasons/:seasonId': SeasonController.delete,
      'put /api/series/:serieId/seasons/:seasonId': SeasonController.update,
    }
  }

  static create(req, res) {
    let serieId = req.params.serieId, serie, folder, season;
    let data = req.body;

    Serie.findById(serieId).populate('folder').then((serieDb) => {
      serie = serieDb;
      folder = new folder({name: data.folder.name, parent: null});
      folder.path = path.join(serie.folder.path, folder._id);
      season = new Season({name: data.name, description: data.description, serie: serie._id, image: data.image, firstAirDate: data.firstAirDate});
      return folder.save();
    }).then((folder) => {
      return season.save();
    }).then((season) => {
      serie.seasons.push(season._id);
      return serie.save();
    }).then((serie) => {
      res.status(200).json(season);
    }).catch((err) => {
      ava.log.error(err);
      res.status(500).json(err);
    });
  }

  static update(req, res) {

  }

  static delete(req, res) {

  }

  static findOne(req, res) {

  }

  static findAll(req, res) {
  
  }
}

module.exports = SeasonController;