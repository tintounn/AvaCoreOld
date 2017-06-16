const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

class FileController {
  static routes() {
    return {
      'post /api/folders/:folderId/files/': FileController.create,
      'get /api/folders/:folderId/files/:id': FileController.findOne,
      'get /api/folders/:folderId/files': FileController.findAll,
      'get /api/folders/:folderId/files/:id/stream': FileController.stream,
      'get /api/folders/:folderId/files/:id/download': FileController.download,
      'delete /api/folders/:folderId/files/:id': FileController.delete,
      'put /api/folders/:folderId/files/:id': FileController.update
    }
  }

  static update(req, res) {

  }

  static delete(req, res) {

  }

  static findOne(req, res) {

  }

  static create(req, res) {
    let data = req.body;
    let folderId = req.params.folderId;

    DownloadService.getDownloadHeader(data.url).then((res) => {
      data.folderId = folderId;
      data.size = res.size;
      data.name = res.name;

      return File.create(data);
    }).then((file) => {
      DownloadService.download(file);
      res.status(200).json({file: file});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static findAll(req, res) {
    let folderId = req.params.folderId;

    File.findAll({where: {folderId: folderId}}).then((files) => {
      res.status(200).json({files: files});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static download(req, res) {
    let id = req.params.id;

    File.findById(id).then((file) => {
      let readStream = fs.createReadStream(ava.config.get('nas:root') + '/' + file.name);
      readStream.pipe(res);
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static stream(req, res) {
    let id = req.params.id;

    File.findById(id).then((file) => {
      let readStream = fs.createReadStream(ava.config.get('nas:root') + '/' + file.name);

      ffmpeg(readStream)
        .videoCodec('libx264')
        .size('720x?')
        .toFormat('mp4')
        .on('error', function(err) {
          res.status(500).json(err);
        }).pipe(res, { end: true });
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}

module.exports = FileController;