import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Room, RoomFactory } from '../../models/room.model';

@Component({
  selector: 'app-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.css']
})
export class RoomEditorComponent implements OnInit {

  @Input('room') room: Room = new Room();
  @Output('saved') savedEvent: EventEmitter<Room> = new EventEmitter<Room>();

  constructor(private roomFactory: RoomFactory) { }

  ngOnInit() {
  }

  onSubmit() { 
    this.roomFactory.createOrUpdate(this.room).then((room) => {
      this.savedEvent.emit(room);
    }).catch((err) => {
      console.error(err);
    })
  }

}
