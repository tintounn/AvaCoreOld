import {Component, Input, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';

import {Room} from "../../models/room";
import {AlarmManagerComponent} from '../alarm-manager/alarm-manager.component';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input('room') room: Room;
  @Output('delete') deleteEvent: EventEmitter<number> = new EventEmitter();
  @ViewChild('alarmManager') alarmManager: AlarmManagerComponent;

  constructor() { }

  ngOnInit() { }

  openAlarmManager() {
    this.alarmManager.open();
  }

  delete() {
    this.deleteEvent.emit(this.room.id);
  }
}
