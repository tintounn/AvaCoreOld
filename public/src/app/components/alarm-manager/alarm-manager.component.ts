import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Room } from '../../models/room';
import { Alarm, AlarmFactory } from '../../models/alarm';
import { AlarmEditorComponent } from '../alarm-editor/alarm-editor.component';

declare var jQuery: any;

@Component({
  selector: 'alarm-manager',
  templateUrl: './alarm-manager.component.html',
  styleUrls: ['./alarm-manager.component.css']
})
export class AlarmManagerComponent implements OnInit {

  @Input('id') id: String = "alarmManager";
  @Input('room') room: Room;
  @ViewChild('alarmEditor') alarmEditor: AlarmEditorComponent;
  private alarms: Array<Alarm> = [];

  constructor(private alarmFactory: AlarmFactory) { }

  ngOnInit() {
    this.alarmFactory.find(this.room.id).then((alarms) => {
      this.alarms = alarms;
    }).catch((err) => {
      console.log(err);
    });
  }

  open() {
    jQuery('#' + this.id).modal({show: true});
  }

  close() {
    jQuery('#' + this.id).modal({show: close});
  }

  alarmCreated(alarm: Alarm) {
    this.alarms.push(alarm);
  }

  deleteAlarm(index: number, id: number) {
    this.alarmFactory.delete(this.room.id, id).then((res) => {
      this.alarms.splice(index, 1);
    }).catch((err) => {
      console.log(err);
    });
  }
}
