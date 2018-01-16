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