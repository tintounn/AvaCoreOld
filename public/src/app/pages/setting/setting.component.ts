import { Component, OnInit } from '@angular/core';

import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  private api: any;
  private nas: any;
  private zwave: any;
  private common: any;

  constructor(private request: RequestService) {}

  ngOnInit() {
    this.request.get('/config/api').then(res => this.api = res.json()).catch(this.handleError);
    this.request.get('/config/nas').then(res => this.nas = res.json()).catch(this.handleError);
    this.request.get('/config/common').then(res => this.common = res.json()).catch(this.handleError);
    this.request.get('/config/zwave').then(res => this.zwave = res.json()).catch(this.handleError);
  }

  saveConfig(name, data) {
    this.request.put('/config/' + name, data).catch(this.handleError);
  }

  handleError(err) {
    console.log(err);
  }
}
