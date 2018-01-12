class NasController {
  static routes() {
    return {
      'get /api/nas/downloads': NasController.findDownloads,
    }
  }

  static findDownloads(req, res) {
    let downloads = Downloadservice.queue;
    res.status(200).json({downloads: downloads});
  }
}

module.exports = NasController;