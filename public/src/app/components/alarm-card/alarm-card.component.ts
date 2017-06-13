import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Alarm, AlarmFactory} from "../../models/alarm";

@Component({
  selector: 'app-alarm-card',
  templateUrl: './alarm-card.component.html',
  styleUrls: ['./alarm-card.component.css']
})
export class AlarmCardComponent implements OnInit {

  @Input('alarm') alarm: Alarm;
  @Input('roomId') roomId: number;
  @Output('deleted') deletedEvent: EventEmitter<number> = new EventEmitter();

  constructor(private alarmFactory: AlarmFactory) { }

  ngOnInit() { }

  delete() {
    this.alarmFactory.delete(this.roomId, this.alarm.id).then(() => {
      this.deletedEvent.emit(this.alarm.id);
    }).catch((err) => {
      console.log(err);
    });
  }
}
