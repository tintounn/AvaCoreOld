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
  
  private rooms: Room[];
  private room: Room = new Room({});
  @ViewChild('roomEditor') roomEditor: RoomEditorComponent;

  constructor(private roomFactory: RoomFactory) {}

  ngOnInit() {
    this.roomFactory.find().then((rooms) => {
      this.rooms = rooms;
    }).catch((err) => {
      console.log(err);
    });
  }

  roomCreated(room: Room) {
    this.rooms.push(room);
    this.roomEditor.close();
  }

  deleteRoom(id, index) {
    this.roomFactory.delete(id).then((res) => {
      this.rooms.splice(index, 1);
    }).catch((err) => {
      console.log(err);
    });
  }

  openRoomEditor() {
    this.roomEditor.open();
  }

}
