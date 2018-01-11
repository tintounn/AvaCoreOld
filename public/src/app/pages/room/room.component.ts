import { Component, OnInit } from '@angular/core';
import { Room, RoomFactory } from '../../models/room.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public room: Room = new Room();

  constructor(private roomFactory: RoomFactory, private route: ActivatedRoute) { }

  ngOnInit() {
    this.roomFactory.find(this.route.snapshot.params['id']).then((room) => {
      this.room = room;
    }).catch((err) => {
      console.error(err);
    });
  }
}
