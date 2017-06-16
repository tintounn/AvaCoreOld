class FolderController {
  static routes() {
    return {
      'post /api/folders/:parent': FolderController.create,
      'get /api/folders/:parent': FolderController.findAll,
      'get /api/folders/:parent/:id': FolderController.findOne,
      'delete /api/folders/:parent/:id': FolderController.delete,
      'put /api/folders/:parent/:id': FolderController.update,
    }
  }

  static create(req, res) {
    let data = req.body;
    data.parent = req.params.parent;

    Folder.create(data).then((folder) => {
      res.status(200).json({folder: folder});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static update(req, res) {

  }

  static delete(req, res) {

  }

  static findOne(req, res) { }

  static findAll(req, res) {
    let parent = req.params.parent;

    Folder.findAll({where: {parent: parent}}).then((folders) => {
      res.status(200).json({folders: folders});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}

module.exports = FolderController;