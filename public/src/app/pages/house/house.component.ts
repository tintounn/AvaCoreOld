import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Room, RoomFactory } from '../../models/room';

declare var jQuery: any;

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit, AfterViewInit {
  private rooms: Room[];
  private room: Room = new Room({});

  constructor(private roomFactory: RoomFactory) {}

  ngOnInit() {
    this.roomFactory.find().then((rooms) => {
      this.rooms = rooms;
    }).catch((err) => {
      console.log(err);
    });
  }

  createRoom() {
    this.roomFactory.create(this.room).then((room) => {
      this.rooms.push(room);
    }).catch((err) => {
      console.log(err);
    });
  }

  deleteRoom(index) {
    this.roomFactory.delete(this.rooms[index].id).then((res) => {
      this.rooms.splice(index, 1);
    }).catch((err) => {
      console.log(err);
    });
  }

  ngAfterViewInit() {
    jQuery('#houseModal').modal({show: false});
  }
}
