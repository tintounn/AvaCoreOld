import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";
import { File } from "./file.model";

export class Movie {
  
  public id: string;
  public image: string;
  public description: string;
  public releaseDate: string;
  public file: File = new File();

  constructor(data?: any) {
    if(data) {
      this.id = data._id;
      this.image = data.image;
      this.description = data.description;
      this.releaseDate = data.releaseDate;
      this.file = new File(data.file);
    }
  }
}

@Injectable()
export class MovieFactory {

  constructor(private requestService: RequestService) {}

  public create(movie: Movie) : Promise<Movie> {
    return this.requestService.post('/movies', movie).then((response) => new Movie(response.json().movie));
  }

  public search(value: string) : Promise<any> {
    return this.requestService.post('/movies/search/' + value, {}).then((response) => response.json().result);
  }

  public find(id: string) : Promise<Movie> {
    return this.requestService.get('/movies/' + id).then((response) => new Movie(response.json().movie));
  }

  public findAll(searchValue: string = "") : Promise<Movie[]> {
    return this.requestService.get('/movies?search=' + searchValue).then((response) => response.json().movies.map((elt) => {return new Movie(elt)}));
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