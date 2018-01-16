class SerieController {
  static routes() {
    return {
      'post /api/series': SerieController.create,
      'get /api/series': SerieController.findAll,
      'get /api/series/:serieId': SerieController.findOne,
      'delete /api/series/:serieId': SerieController.delete,
      'put /api/series/:serieId': SerieController.update,
    }
  }

  static create(req, res) {

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

module.exports = SerieController;