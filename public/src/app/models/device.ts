import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RequestService } from '../services/request.service';

export class Device {
  public nodeId: number;
  public nodeInfo: any;
  public categories: string[];
  public values: any;

  constructor(data: any) {
    if(data.nodeId) this.nodeId = data.nodeId;
    if(data.nodeInfo) this.nodeInfo = data.nodeInfo;
    if(data.categories) this.categories = data.categories;
    if(data.values) this.values = data.values;
  }
}

@Injectable()
export class DeviceFactory {
  constructor(private request: RequestService) { }

  orphans(): Promise<Device[]> {
    return this.request.get('/devices/orphans').then(response => response.json().devices.map((elt) => { return new Device(elt); }));
  }

  find(roomId: number): Promise<Device[]> {
    return this.request.get('/rooms/'+ roomId +'/devices').then(response => response.json().devices.map((elt) => { return new Device(elt); }));
  }

  setValue(nodeId: number, valueId: string, value: string): Promise<Device[]> {
    return this.request.put('/devices/' + nodeId, {valueId: valueId, value: value});
  }
}
