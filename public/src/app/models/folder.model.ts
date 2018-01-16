import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";

export class Folder {
  
  public id: string;
  public name: string;
  public path: string;

  constructor(data?: any) {
    if(data) {
      this.id = data._id;
      this.name = data.name;
      this.path = data.path;
    }
  }
}

@Injectable()
export class FolderFactory {

  constructor(private requestService: RequestService) {}

}