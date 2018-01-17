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

  public findAll(serieId: string):Promise<Season[]> {
    return this.requestService.get('/series/'+serieId+"/seasons").then((response) => response.json().seasons.map((elt) => {return new Season(elt)}));
  }

  public find(serieId: string, id: string):Promise<Season> {
    return this.requestService.get('/series/'+id+"/seasons/"+serieId).then((response) => {return new Season(response.json().season)});
  }

  public create(serieId: string, season: Season):Promise<Season> {
    return this.requestService.post('/series/'+serieId+"/seasons", season).then((response) => {return new Season(response.json().season)});
  }

  public update(serieId: string, season: Season):Promise<Season> {
    return this.requestService.put('/series/'+serieId+"/seasons/"+season.id, season).then((response) => {return new Season(response.json().season)});
  }

  public remove(serieId: string, id: string):Promise<any> {
    return this.requestService.delete('/series/'+serieId+"/seasons/"+id);
  }

  public createOrUpdate(serieId: string, season: Season):Promise<Season> {
    let promise;
    if(season.id) {
      promise = this.update(serieId, season);
    } else {
      promise = this.create(serieId, season);
    }

    return promise;
  }
  
}