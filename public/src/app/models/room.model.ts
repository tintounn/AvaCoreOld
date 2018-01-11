import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";

import { Alarm } from './alarm.model';

export class Room {
  
  public id: number;
  public name: string;
  public image: string;
  public alarms: Alarm[];

  constructor(data?: any) {
    if(data) {
      this.id = data._id;
      this.name = data.name;
      this.image = data.image;
      this.alarms = data.alarms || [];
    }
  }
}

@Injectable()
export class RoomFactory {
  
  constructor(private requestService: RequestService) {}

  public create(room: Room) : Promise<Room> {
    return this.requestService.post('/rooms', room).then((response) => new Room(response.json().room));
  }

  public find(id: number) : Promise<Room> {
    return this.requestService.get('/rooms/' + id).then((response) => new Room(response.json().room));
  }

  public findAll() : Promise<Room[]> {
    return this.requestService.get('/rooms').then((response) => response.json().rooms.map((elt) => {return new Room(elt)}));
  }

  public update(room: Room) : Promise<Room> {
    return this.requestService.put('/rooms/' + room.id, room).then((response) => new Room(response.json().room));
  }

  public remove(id: number) : Promise<any> {
    return this.requestService.delete('/rooms/' + id);
  }

  public createOrUpdate(room: Room) : Promise<Room> {
    let promise;
    if(room.id) {
      promise = this.update(room);
    } else {
      promise = this.create(room);
    }

    return promise;
  }
}