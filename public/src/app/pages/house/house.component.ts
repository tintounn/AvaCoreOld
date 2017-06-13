import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Room, RoomFactory } from '../../models/room';
import { RoomEditorComponent } from '../../components/room-editor/room-editor.component';

declare var jQuery: any;

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  public rooms: Room[];
  @ViewChild('roomEditor') roomEditor: RoomEditorComponent;

  constructor(private roomFactory: RoomFactory) {}

  ngOnInit() {
    this.roomFactory.find().then((rooms) => {
      this.rooms = rooms;
    }).catch((err) => {
      console.log(err);
    });
  }

  createRoom() {
    this.roomEditor.open();
  }

  roomCreated(room: Room) {
    this.rooms.push(room);
  }

  roomDeleted(id, index) {
    this.rooms.splice(index, 1);
  }
}
