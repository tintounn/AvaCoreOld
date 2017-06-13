import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Room, RoomFactory} from "../../models/room";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {RoomEditorComponent} from "../../components/room-editor/room-editor.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {

  public room: Room;
  private sub: Subscription;

  @ViewChild('roomEditor') roomEditor: RoomEditorComponent;

  constructor(private route: ActivatedRoute, private roomFactory: RoomFactory) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      let id: number = params['id'];

      this.roomFactory.findOne(id).then((room) => {
        this.room = room;
      }).catch((err) => {
        console.log(err);
      })
    });
  }

  updateRoom() {
    this.roomEditor.open();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
