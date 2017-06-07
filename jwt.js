const jwt = require('jsonwebtoken');

class Jwt {
  constructor() { }

  sign(data) {
    return new Promise((resolve, reject) => {
      jwt.sign(data, ava.config.get('secret'), {expiresIn: '1h', algorithm: 'HS256'}, (err, token) => {
        if(err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, ava.config.get('secret'), (err, decoded) => {
        if(err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

}

module.exports = Jwt;