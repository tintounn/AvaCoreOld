import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Alarm} from "../../models/alarm";

@Component({
  selector: 'app-alarm-card',
  templateUrl: './alarm-card.component.html',
  styleUrls: ['./alarm-card.component.css']
})
export class AlarmCardComponent implements OnInit {

  @Input('alarm') alarm: Alarm;
  @Output('delete') deleteEvent: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleteEvent.emit(this.alarm.id);
  }
}
