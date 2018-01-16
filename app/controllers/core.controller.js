

class CoreController {
  constructor() {}

  static routes() {
    return {
      'get /api/core/harddrive': CoreController.hardDriveInfo,
      'get /api/core/network': CoreController.networkInfo,
      'get /api/core/performance': CoreController.performanceInfo,

      'get /api/notifications': CoreController.getNotifications,
      'delete /api/notifications': CoreController.removeAllNotification,
      'delete /api/notifications/:index': CoreController.removeNotification
    }
  }

  static hardDriveInfo(req, res) {
    Systemservice.getHardDriveInfo().then((mnts) => {
      res.status(200).json(mnts);
    }).catch((err) => {
      ava.log.error(err);
      res.status(500).json(err);
    });
  }

  static networkInfo(req, res) {
    res.status(200).json(Systemservice.getNetworkInfo());
  }

  static performanceInfo(req, res) {
    Systemservice.getPerformanceInfo().then((perfs) => {
      res.status(200).json(perfs);
    }).catch((err) => {
      res.status(500).json(err);
    });
  }

  static getNotifications(req, res) {
    res.status(200).json({notifications: Notificationservice.notifications});
  }

  static removeAllNotification(req, res) {
    Notificationservice.clear();

    res.sendStatus(200);
  }

  static removeNotification(req, res) {
    let index = req.params.index;

    Notificationservice.remove(index);
    res.sendStatus(200);
  }

  static index(req, res) {
    Room.findAll().then((rooms) => {
      res.status(200).json(rooms);
    });
  }
}

module.exports = CoreController;