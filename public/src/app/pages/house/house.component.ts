import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoomFactory, Room } from '../../models/room.model';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  public rooms: Room[] = [];
  @ViewChild('roomEditorModal') roomEditorModal: ClrModal;

  constructor(private roomFactory: RoomFactory, private router: Router) { }

  ngOnInit() {
    this.roomFactory.findAll().then((rooms) => {
      this.rooms = rooms;
    }).catch((err) => {
      console.error(err);
    });
  }

  openRoomEditorModal() {
    this.roomEditorModal.open();
  }

  onRoomClicked(room: Room) {
    this.router.navigate(['/rooms', room.id]);
  }

  onRoomSaved(room: Room) {
    this.rooms.push(room);
    this.roomEditorModal.close();
  }
}
