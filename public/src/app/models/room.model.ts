import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";

export class Room {

  public id: number;
  public name: string;
  public image: string;

  constructor(data: any) {
    if(data.id) this.id = data._id;
    this.name = data.name;
    this.image = data.image;
  }
}

@Injectable()
export class RoomFactory {

  constructor(private requestService: RequestService) {

  }

}