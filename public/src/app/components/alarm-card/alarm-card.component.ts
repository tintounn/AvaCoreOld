import {Component, Input, OnInit} from '@angular/core';
import {Alarm} from "../../models/alarm";

@Component({
  selector: 'app-alarm-card',
  templateUrl: './alarm-card.component.html',
  styleUrls: ['./alarm-card.component.css']
})
export class AlarmCardComponent implements OnInit {

  @Input('alarm') alarm: Alarm;

  constructor() { }

  ngOnInit() {
  }
}
