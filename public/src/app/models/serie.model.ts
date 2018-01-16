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

  
}