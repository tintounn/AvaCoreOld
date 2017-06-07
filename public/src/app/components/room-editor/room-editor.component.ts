import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Room, RoomFactory} from "../../models/room";

@Component({
  selector: 'app-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.css']
})
export class RoomEditorComponent implements OnInit {

  @Input('room') room: Room = new Room({});
  @Output('saved') savedEvent: EventEmitter<Room> = new EventEmitter();

  constructor(private roomFactory: RoomFactory) { }

  ngOnInit() {
  }

  save() {
    this.roomFactory.createOrUpdate(this.room).then((room) => {
      this.savedEvent.emit(room);
    }).catch((err) => {
      console.error(err);
    });
  }
}
