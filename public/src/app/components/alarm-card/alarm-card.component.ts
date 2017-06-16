import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Alarm, AlarmFactory} from "../../models/alarm";

@Component({
  selector: 'app-alarm-card',
  templateUrl: './alarm-card.component.html',
  styleUrls: ['./alarm-card.component.css']
})
export class AlarmCardComponent implements OnInit {

  private days: Dictionary;

  @Input('alarm') alarm: Alarm;
  @Input('roomId') roomId: number;
  @Output('deleted') deletedEvent: EventEmitter<number> = new EventEmitter();

  constructor(private alarmFactory: AlarmFactory) {
    this.days = {1: 'Lun', 2: 'Mar', 3: 'Mer', 4: 'Jeu', 5: 'Ven', 6: 'Sam', 0: 'Dim'};
  }

  ngOnInit() { }

  keys(): Array<string> {
    return Object.keys(this.days);
  }

  delete() {
    this.alarmFactory.delete(this.roomId, this.alarm.id).then(() => {
      this.deletedEvent.emit(this.alarm.id);
    }).catch((err) => {
      console.log(err);
    });
  }
}

interface Dictionary {
  [ index: number ]: string
}
