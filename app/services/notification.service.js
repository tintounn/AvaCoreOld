const request = require('request');

class NotificationService {
  constructor() {
    this.notifications = [];
  }

  send(level, msg) {
    let notification = {
      level: level,
      date: Date.now(),
      msg: msg
    };

    this.notifications.push(notification);
    ava.admins.emit('notifications:added', notification);
  }

  clear() {
    this.notifications = [];
    ava.admins.emit('notifications:cleared');
  }

  remove(index) {
    this.notifications.splice(index, 1);
  }
}

module.exports = NotificationService;