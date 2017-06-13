import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlarmFactory, Alarm} from "../../models/alarm";

declare var jQuery: any;

@Component({
  selector: 'app-alarm-editor',
  templateUrl: './alarm-editor.component.html',
  styleUrls: ['./alarm-editor.component.css']
})
export class AlarmEditorComponent implements OnInit {

  private days: Dictionary;
  private id: string = "alarmEditor";

  @Input('alarm') alarm: Alarm = new Alarm({});
  @Input('roomId') roomId: number;
  @Output('created') createdEvent: EventEmitter<Alarm> = new EventEmitter();

  constructor(private alarmFactory: AlarmFactory) {
    this.days = {1: 'Lun', 2: 'Mar', 3: 'Mer', 4: 'Jeu', 5: 'Ven', 6: 'Sam', 0: 'Dim'};
  }

  ngOnInit() { }

  save() {
    this.alarmFactory.createOrUpdate(this.roomId, this.alarm).then((alarm) => {
      this.createdEvent.emit(alarm);
      this.close();
    }).catch((err) => {
      console.error(err);
    });
  }

  open() {
    jQuery('#' + this.id).modal({show: true});
  }

  close() {
    jQuery('#' + this.id).modal({show: close});
  }

  selectDay(id: number) {
    let day = this.alarm.days.indexOf(id);
    if(day > -1) {
      this.alarm.days.splice(day, 1);
    } else {
      this.alarm.days.push(id);
    }

    return true;
  }

  keys(): Array<string> {
    return Object.keys(this.days);
  }

  setAlarm(alarm: Alarm) {
    this.alarm = alarm;
  }
}

interface Dictionary {
    [ index: number ]: string
}

