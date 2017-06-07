import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RequestService } from '../services/request.service';

export class Room {
  public id: number;
  public name: string;
  public image: string;

  constructor(data: any) {
    this.id = data.id;
    if(data.name) this.name = data.name;
    if(data.image) this.image = data.image;
  }
}

@Injectable()
export class RoomFactory {
  constructor(private request: RequestService) { }

  find(): Promise<Room[]> {
    return this.request.get('/rooms').then(response => response.json().rooms.map((elt) => { return new Room(elt); }));
  }

  delete(id: number): Promise<any> {
    return this.request.delete('/rooms/' + id);
  }

  create(room: Room): Promise<Room> {
    return this.request.post('/rooms', room).then(response => new Room(response.room.json()));
  }

  findOne(id: number): Promise<Room> {
    return this.request.get('/rooms/' + id).then(response => new Room(response.room.json()));
  }

  update(room: Room): Promise<Room> {
    return this.request.put('/rooms/' + room.id, room).then(response => new Room(response.room.json()));
  }

  createOrUpdate(room: Room): Promise<Room> {
    let promise;

    if(room.id) {
      promise = this.update(room);
    } else {
      promise = this.create(room);
    }

    return promise;
  }
}
