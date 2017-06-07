import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RequestService } from '../services/request.service';

export class Alarm {
  public id: number;
  public name: string;
  public time: string;
  public days: Array<number>;

  constructor(data: any) {
    if(data.id) this.id = data.id;
    if(data.name) this.name = data.name;
    if(data.time) this.time = data.time;
    if(data.days) this.days = data.days;
  }
}

@Injectable()
export class AlarmFactory {
  constructor(private request: RequestService) { }

  find(roomId: number): Promise<Alarm[]> {
    return this.request.get('/rooms/' + roomId + '/alarms').then(response => response.json().map((elt) => { return new Alarm(elt); }));
  }

  delete(roomId: number, alarmId: number): Promise<any> {
    return this.request.delete('/rooms/' + roomId + '/alarms/' + alarmId);
  }

  create(roomId: number, alarm: Alarm): Promise<Alarm> {
    return this.request.post('/rooms/' + roomId + '/alarms', alarm).then(response => new Alarm(response.json()));
  }

  findOne(roomId: number, alarmId: number): Promise<Alarm> {
    return this.request.get('/rooms/' + roomId + '/alarms/' + alarmId).then(response => new Alarm(response.json()));
  }

  update(roomId: number, alarm: Alarm): Promise<Alarm> {
    return this.request.put('/rooms/' + roomId + '/alarms/' + alarm.id, alarm).then(response => new Alarm(response.json()));
  }

  createOrUpdate(roomId: number, alarm: Alarm) {
    let promise;

    if(alarm.id) {
      promise = this.update(roomId, alarm);
    } else {
      promise = this.create(roomId, alarm);
    }

    return promise;
  }
}
