
import { Component, OnInit, Input } from '@angular/core';
import {Device, DeviceFactory} from "../../models/device";

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.css']
})
export class DeviceCardComponent implements OnInit {

  @Input('device') device: Device;

  constructor(private deviceFactory: DeviceFactory) { }

  ngOnInit() {
  }

  setValue(valueName, value) {
    this.deviceFactory.setValue(this.device.nodeId, valueName, value);
  }

  valuesKeys(): string[] {
    return Object.keys(this.device.values);
  }
}
