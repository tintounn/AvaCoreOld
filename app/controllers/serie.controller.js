const path = require('path');

class SerieController {
  static routes() {
    return {
      'post /api/series': SerieController.create,
      'post /api/series/search/:value': SerieController.search,
      'get /api/series': SerieController.findAll,
      'get /api/series/:id': SerieController.findOne,
      'delete /api/series/:id': SerieController.delete,
      'put /api/series/:id': SerieController.update,
    }
  }

  static create(req, res) {
    let data = req.body;

    let folder = new Folder({name: data.folder.name, parent: null});
    folder.path = path.join(ava.config.get('nas:root'), ava.config.get('nas:series'), '/', folder._id.toString());

    let serie = new Serie({firstAirDate: data.firstAirDate, image: data.image, popularity: data.popularity, folder: folder._id, description: data.description});

    folder.save().then((folder) => {
      serie.folder = folder;
      return serie.save();
    }).then((serie) => {
      res.status(200).json({serie: serie});
    }).catch((err) => {
      ava.log.error(err);
      res.status(500).json(err);
    });
  }

  static search(req, res) {
    let value = req.params.value;

    Tmdbservice.searchSerie(value).then((result) => {
      res.status(200).json({result: result});
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
    let id = req.params.id;

    let popSeason = {path: 'seasons', model: 'Season', populate: {path: 'folder', model: 'Folder'}};
    Serie.findById(id).populate('folder').populate(popSeason).then((serie) => {
      res.status(200).json({serie: serie});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static findAll(req, res) {
    let value = req.query.search;
    let query = {};

    if(value) {
      query = {'lowerName': { $regex: '^' + value } };
    }

    Folder.find(query).then((folders) => {
      let ids = folders.map((elt) => {return elt._id});
      return Serie.find({'folder' : {$in: ids}}).populate('folder');
    }).then((series) => {
      res.status(200).json({series: series});
    }).catch((err) => {
      ava.log.error(err);
      res.status(500).json(err);
    });
  }
}

module.exports = SerieController;