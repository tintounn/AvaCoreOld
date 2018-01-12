import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";
import { File } from "./file.model";

export class Movie extends File {
  
  public id: string;
  public image: string;
  public description: string;
  public releaseDate: string;

  constructor(data?: any) {
    if(data) {
      super(data.file);
    } else {
      super();
    }

    if(data) {
      this.id = data._id;
      this.image = data.file;
      this.description = data.description;
      this.releaseDate = data.releaseDate;
    }
  }
}

@Injectable()
export class MovieFactory {

  constructor(private requestService: RequestService) {}

  public create(movie: Movie) : Promise<Movie> {
    return this.requestService.post('/movies', movie).then((response) => new Movie(response.json().movie));
  }

  public find(id: number) : Promise<Movie> {
    return this.requestService.get('/movies/' + id).then((response) => new Movie(response.json().movie));
  }

  public findAll() : Promise<Movie[]> {
    return this.requestService.get('/movies').then((response) => response.json().movies.map((elt) => {return new Movie(elt)}));
  }

  public update(movie: Movie) : Promise<Movie> {
    return this.requestService.put('/movies/' + movie.id, movie).then((response) => new Movie(response.json().movie));
  }

  public remove(id: number) : Promise<any> {
    return this.requestService.delete('/movies/' + id);
  }

  public createOrUpdate(movie: Movie) : Promise<Movie> {
    let promise;
    if(movie.id) {
      promise = this.update(movie);
    } else {
      promise = this.create(movie);
    }

    return promise;
  }
}