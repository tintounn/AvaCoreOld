import {Component, EventEmitter, Input, AfterViewInit, Output} from '@angular/core';
import {Room, RoomFactory} from "../../models/room";

declare var jQuery: any;

@Component({
  selector: 'app-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.css']
})
export class RoomEditorComponent implements AfterViewInit {

  @Input('id') id: String = "roomEditorModal";
  @Input('room') room: Room = new Room({});
  @Output('saved') savedEvent: EventEmitter<Room> = new EventEmitter();

  constructor(private roomFactory: RoomFactory) { }

  ngAfterViewInit() { 

  }

  open() {
    jQuery('#' + this.id).modal({show: true});
  }

  close() {
    jQuery('#' + this.id).modal({show: close});
  }

  save() {
    this.roomFactory.createOrUpdate(this.room).then((room) => {
      this.savedEvent.emit(room);
    }).catch((err) => {
      console.error(err);
    });
  }
}
