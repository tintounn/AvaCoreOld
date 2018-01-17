import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";
import { Folder } from "./folder.model";
import { Season } from "./season.model";

export class Serie {
  
  public id: string;
  public image: string;
  public description: string;
  public popularity: number;
  public firstAirDate: string;
  public folder: Folder = new Folder();
  public seasons: Season[] = [];

  constructor(data?: any) {
    if(data) {
      this.id = data._id;
      this.image = data.image;
      this.description = data.description;
      this.popularity = data.popularity;
      this.firstAirDate = data.firstAirDate;
      this.folder = new Folder(data.folder);
      this.seasons = data.seasons.map((elt) => new Season(elt));
    }
  }
}

@Injectable()
export class SerieFactory {

  constructor(private requestService: RequestService) {}

  public findAll(searchValue: string):Promise<Serie[]> {
    return this.requestService.get('/series?search=' + searchValue).then((response) => response.json().series.map((elt) => {return new Serie(elt)}));
  }

  public search(value: string) : Promise<any> {
    return this.requestService.post('/series/search/' + value, {}).then((response) => response.json().result);
  }

  public find(id: string):Promise<Serie> {
    return this.requestService.get('/series/'+id).then((response) => {return new Serie(response.json().serie)});
  }

  public create(serie: Serie):Promise<Serie> {
    return this.requestService.post('/series', serie).then((response) => {return new Serie(response.json().serie)});
  }

  public update(serie: Serie):Promise<Serie> {
    return this.requestService.put('/series/'+serie.id, serie).then((response) => {return new Serie(response.json().serie)});
  }

  public remove(id: string):Promise<any> {
    return this.requestService.delete('/series/'+id);
  }

  public createOrUpdate(serie: Serie):Promise<Serie> {
    let promise;
    if(serie.id) {
      promise = this.update(serie);
    } else {
      promise = this.create(serie);
    }

    return promise;
  }
}