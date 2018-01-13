const ffmpeg = require('fluent-ffmpeg');

class NasController {
  static routes() {
    return {
      'get /api/nas/downloads': NasController.findDownloads,
      'get /api/nas/stream/:id': NasController.stream
    }
  }

  static findDownloads(req, res) {
    let downloads = Downloadservice.queue;
    res.status(200).json({downloads: downloads});
  }

  static stream(req, res) {
    let id = req.params.id;
    console.log(id);
    File.findById(id).then((file) => {
      res.contentType('video/mp4');
      ffmpeg(file.path)
        .format('mp4')
        .videoCodec('libx264')
        .audioBitrate('192k')
        .audioChannels(2)
        .outputOptions('-movflags', 'frag_keyframe')
        .addOption(['-preset ultrafast'])
        .size('?x720')
        .videoBitrate('2048k')
        .fps(24)
        .on('stderr', (err) => {
          console.log(err);
        })
        .on('error', (err) => {
          ava.log.error(err);
        }).pipe(res, {end: true});
    }).catch((err) => {
      ava.log.error(err);
    });
  }
}

module.exports = NasController;
