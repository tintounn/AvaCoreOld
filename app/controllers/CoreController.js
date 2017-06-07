class CoreController {
  constructor() {}

  static routes() {
    return {
      'get /api/': CoreController.test,
      'post /api/auth': CoreController.auth,
      'get /api/authenticated': CoreController.authenticated,
    }
  }

  static index(req, res) {
    Room.findAll().then((rooms) => {
      res.status(200).json(rooms);
    });
  }

  static auth(req, res) {
    if(ava.config.get('admin:code') == req.body.code) {
      ava.jwt.sign({role: 'admin'}).then((token) => {
        res.status(200).json({token: token});
      }).catch((err) => {
        res.status(500).json(err);
      });
    } else {
      res.sendStatus(400);
    }
  }

  static authenticated(req, res) {
    let token = req.query.token;

    ava.jwt.verify(token).then((data) => {
      res.sendStatus(200);
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static test(req, res) {
    let objects = HomeService.getObjectsByRoom('');
    res.status(200).json(objects);
  }
}

module.exports = CoreController;