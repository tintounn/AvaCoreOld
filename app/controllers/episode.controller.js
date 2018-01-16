class EpisodeController {
  static routes() {
    return {
      'post /api/series/:serieId/seasons/:seasonId/episodes': EpisodeController.create,
      'get /api/series/:serieId/seasons/:seasonId/episodes': EpisodeController.findAll,
      'get /api/series/:serieId/seasons/:seasonId/episodes/:id': EpisodeController.findOne,
      'delete /api/series/:serieId/seasons/:seasonId/episodes/:id': EpisodeController.delete,
      'put /api/series/:serieId/seasons/:seasonId/episodes/:id': EpisodeController.update,
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

module.exports = EpisodeController;