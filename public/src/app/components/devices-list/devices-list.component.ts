import {Component, Input, OnInit} from '@angular/core';
import {Device, DeviceFactory} from "../../models/device.model";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  @Input('category') category: string = null;
  @Input('roomId') roomId: string = null;
  public devices: Device[] = [];

  constructor(private deviceFactory: DeviceFactory) { }

  ngOnInit() {
    this.deviceFactory.findAll().then((devices) => {
      this.devices = devices;
    }).catch((err) => {
      console.error(err);
    });
  }
}
