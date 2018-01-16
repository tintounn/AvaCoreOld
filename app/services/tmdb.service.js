const request = require('request');

class MovieDbService {
  constructor() {
    let apiKey = ava.config.get('api:tmdb');
    this.searchMovieUrl = "https://api.themoviedb.org/3/search/movie?language=fr-FR&api_key=" + apiKey;

    this.searchSerieUrl = "https://api.themoviedb.org/3/search/tv?language=fr-FR&api_key=" + apiKey;
    this.findSerieUrl = "https://api.themoviedb.org/3/tv/|id|?language=fr-FR&api_key=" + apiKey;
  }

  sendSearchRequest(url, value) {
    return new Promise((resolve, reject) => {
      request(url + "&query=" + value, (err, res, body) => {
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

  searchMovie(value) {
    return this.sendSearchRequest(this.searchMovieUrl, value);
  }

  searchSerie(value) {
    return this.sendSearchRequest(this.searchSerieUrl, value);
  }

  findSerie(id) {
    return this.sendSearchRequest(this.findSerie.replace('|id|', id), "");
  }
}

module.exports = MovieDbService;