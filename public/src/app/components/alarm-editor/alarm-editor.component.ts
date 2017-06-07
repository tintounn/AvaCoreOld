import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlarmFactory, Alarm} from "../../models/alarm";

@Component({
  selector: 'app-alarm-editor',
  templateUrl: './alarm-editor.component.html',
  styleUrls: ['./alarm-editor.component.css']
})
export class AlarmEditorComponent implements OnInit {

  @Input('alarm') alarm: Alarm = new Alarm({});
  @Input('roomId') roomId: number;
  @Output('saved') savedEvent: EventEmitter<Alarm> = new EventEmitter();

  constructor(private alarmFactory: AlarmFactory) { }

  ngOnInit() { }

  save() {
    this.alarmFactory.createOrUpdate(this.roomId, this.alarm).then((alarm) => {
      this.savedEvent.emit(alarm);
    }).catch((err) => {
      console.error(err);
    });
  }

}
