import {Component, Input, OnInit} from '@angular/core';
import {Device, DeviceFactory} from "../../models/device.model";

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent implements OnInit {

  @Input('device') device = new Device();

  constructor(private deviceFactory: DeviceFactory) { }

  ngOnInit() {
  }

  setValue(action) {
    let body = {
      method: action.method,
      value: this.device.props[action.prop]
    };

    this.deviceFactory.setValue(this.device.nodeId, body).then(() => {
      console.log('Set value successful');
    }).catch((err) => {
      console.error(err);
    });
  }

}
