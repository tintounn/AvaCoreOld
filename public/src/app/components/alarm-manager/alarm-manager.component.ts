import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Room } from '../../models/room';
import { Alarm, AlarmFactory } from '../../models/alarm';
import { AlarmEditorComponent } from '../alarm-editor/alarm-editor.component';

@Component({
  selector: 'app-alarm-manager',
  templateUrl: './alarm-manager.component.html',
  styleUrls: ['./alarm-manager.component.css']
})
export class AlarmManagerComponent implements OnInit {

  public alarms: Array<Alarm> = [];

  @Input('roomId') roomId: number;
  @ViewChild('alarmEditor') alarmEditor: AlarmEditorComponent;

  constructor(private alarmFactory: AlarmFactory) { }

  ngOnInit() {
    this.alarmFactory.find(this.roomId).then((alarms) => {
      this.alarms = alarms;
    }).catch((err) => {
      console.log(err);
    });
  }

  createAlarm() {
    this.alarmEditor.open();
  }

  alarmCreated(alarm: Alarm) {
    this.alarms.push(alarm);
  }

  updateAlarm(index: number) {
    this.alarmEditor.setAlarm(this.alarms[index]);
  }

  alarmDeleted(index: number, id: number) {
    this.alarms.slice(index, 1);
  }
}
