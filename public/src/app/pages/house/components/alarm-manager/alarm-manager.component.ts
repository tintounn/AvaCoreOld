import { Component, OnInit, Input } from '@angular/core';

import { Room } from '../../../../models/room';
import { Alarm, AlarmFactory } from '../../../../models/alarm';

@Component({
  selector: 'alarm-manager',
  templateUrl: './alarm-manager.component.html',
  styleUrls: ['./alarm-manager.component.css']
})
export class AlarmManagerComponent implements OnInit {
  @Input() room: Room;
  private alarms: Array<Alarm>;
  private alarm: Alarm = new Alarm({days: []});
  private days: Dictionary;

  constructor(private alarmFactory: AlarmFactory) {
    this.days = {1: 'Lun', 2: 'Mar', 3: 'Mer', 4: 'Jeu', 5: 'Ven', 6: 'Sam', 0: 'Dim'};
  }

  ngOnInit() {
    this.alarmFactory.find(this.room.id).then((alarms) => {
      console.log(alarms);
      this.alarms = alarms;
    }).catch((err) => {
      console.log(err);
    });
  }

  createAlarm() {
    this.alarmFactory.create(this.room.id, this.alarm).then((alarm) => {
      console.log(alarm);
      this.alarms.push(alarm);
    }).catch((err) => {
      console.log(err);
    });
  }

  deleteAlarm(index: number) {
    this.alarmFactory.delete(this.room.id, this.alarms[index].id).then((res) => {
      this.alarms.splice(index, 1);
    }).catch((err) => {
      console.log(err);
    });
  }

  selectDay(id: number) {
    let day = this.alarm.days.indexOf(id);
    if(day > -1) {
      this.alarm.days.splice(day, 1);
    } else {
      this.alarm.days.push(id);
    }

    return true;
  }

  keys(): Array<string> {
    return Object.keys(this.days);
  }
}

interface Dictionary {
    [ index: number ]: string
}
