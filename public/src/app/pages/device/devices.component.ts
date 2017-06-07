import { Component, OnInit } from '@angular/core';
import {DeviceFactory, Device} from "../../models/device";
import {RoomFactory, Room} from "../../models/room";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  public rooms: Room[] = [];
  private devices: Device[] = [];
  public selectedRoom: Room = null;

  constructor(private deviceFactory: DeviceFactory, private roomFactory: RoomFactory) {
    this.roomFactory.find().then((rooms) => {
      this.rooms = rooms;
      this.getDevices(null);
    }).catch((err) => { console.error(err); });
  }

  getDeviceType(device): string {
    return device.categories[0];
  }

  getDevices(room: Room) {
    let promise: Promise<Device[]> = null;

    if(room) {
      console.log(room);
      promise = this.deviceFactory.find(room.id);
    } else {
      promise = this.deviceFactory.orphans();
    }

    promise.then((devices) => {
      this.devices = devices;
    }).catch((err) => {
      console.error(err);
    });
  }


  ngOnInit() {

  }
}
