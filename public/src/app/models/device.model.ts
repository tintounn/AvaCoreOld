import {Injectable} from "@angular/core";
import {RequestService} from "../services/request.service";

export class Device {

  public nodeId: string;
  public name: string;
  public actions: any[] = [];
  public categories: string[] = [];
  public props: any[] = [];

  constructor(data?: any) {
    if(data) {
      this.nodeId = data.nodeId;
      this.name = data.name;
      this.actions = data.actions;
      this.categories = data.categories;
      this.props = data.props;
    }
  }
}

@Injectable()
export class DeviceFactory {

  constructor(private requestService: RequestService) {}

  public findAll() : Promise<Device[]> {
    return this.requestService.get('/devices').then((response) => response.json().devices.map((elt) => {return new Device(elt)}));
  }

  public setValue(nodeId: string, data: any) {
    return this.requestService.post('/devices/' + nodeId + '/value', data);
  }
}
