class MovieController {
  static routes() {
    return {
      'post /api/movies': MovieController.create,
      'post /api/movies/moviedb': MovieController.movieDb,
      'get /api/movies/:id': MovieController.findOne,
      'get /api/movies': MovieController.findAll,
      'delete /api/movies/:id': MovieController.delete,
      'put /api/movies/:id': MovieController.update,
    }
  }

  static create(req, res) {
    let data = req.body;

    Downloadservice.getDownloadHeader(data.url).then((stat) => {
      let file = new File({size: stat.size, url: data.url, name: data.name, parent: null, path: ava.config.get('nas:root') + ava.config.get('nas:movie') + '/' + stat.name});
      let movie = new Movie({releaseDate: data.releaseDate, image: data.image, popularity: data.popularity, file: file._id});

      file.save().then((file) => {
        movie.file = file;
        return movie.save();
      }).then((movie) => {
        Downloadservice.download(movie);
        res.status(200).json(movie);
      }).catch((err) => {
        res.status(500).json(err);
      });
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static movieDb(req, res) {

  }

  static update(req, res) {

  }

  static delete(req, res) {

  }

  static findOne(req, res) {

  }

  static findAll(req, res) {
    let roomId = req.params.roomId;

    Alarm.findAll({where: {roomId: roomId}}).then((alarms) => {
      res.status(200).json({alarms: alarms});
    }).catch((err) => {
      res.status(500).json(err);
    });
  }
}

module.exports = MovieController;