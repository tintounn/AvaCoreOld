const request = require('request');

class MovieDbService {
  constructor() {
    let apiKey = ava.config.get('api:tmdb');
    this.url = "https://api.themoviedb.org/3/search/movie?language=fr-FR&api_key=" + apiKey;
  }

  find(value) {
    return new Promise((resolve, reject) => {
      request(this.url + "&query=" + value, (err, res, body) => {
        if(err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      }).on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = MovieDbService;