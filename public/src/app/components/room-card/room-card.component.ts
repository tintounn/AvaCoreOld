import {Component, Input, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';

import {Room, RoomFactory} from "../../models/room";
import {AlarmManagerComponent} from '../alarm-manager/alarm-manager.component';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input('room') room: Room;
  @Output('deletes') deletedEvent: EventEmitter<number> = new EventEmitter();
  @ViewChild('alarmManager') alarmManager: AlarmManagerComponent;

  constructor(private roomFactory: RoomFactory) { }

  ngOnInit() { }
  
  delete() {
    this.roomFactory.delete(this.room.id).then(() => {
      this.deletedEvent.emit(this.room.id);
    }).catch((err) => {
      console.log(err);
    });
  }
}
