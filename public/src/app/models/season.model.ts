import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";
import { Folder } from "./folder.model";
import { Serie } from "./serie.model";

export class Season {
  
  public id: string;
  public number: number;
  public image: string;
  public firstAirDate: string;
  public folder: Folder = new Folder();
  public serie: Serie = new Serie();

  constructor(data?: any) {
    if(data) {
      this.id = data._id;
      this.image = data.image;
      this.number = data.number;
      this.firstAirDate = data.firstAirDate;
      this.folder = new Folder(data.folder);
    }
  }
}

@Injectable()
export class SeasonFactory {

  constructor(private requestService: RequestService) {}

  
}