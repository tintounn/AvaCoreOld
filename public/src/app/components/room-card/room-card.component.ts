import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input("room") room: Room = new Room();

  constructor() { }

  ngOnInit() {
  }
}
