import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-cpu-info',
  templateUrl: './cpu-info.component.html',
  styleUrls: ['./cpu-info.component.css']
})
export class CpuInfoComponent implements OnInit, OnDestroy {

  public perfs: any = {cpu: {}};
  private interval: any;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.refreshPerformanceInfo();
    this.interval = setInterval(() => this.refreshPerformanceInfo(), 2000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getMemoryUsage() {
    if(this.perfs.freemem) {
      return (1-(this.perfs.freemem/this.perfs.totalmem)) * 100;
    } else {
      return 0;
    }
  }

  getCpuUsage() {
    if(this.perfs.cpu.usage) {
      return parseInt(this.perfs.cpu.usage);
    } else {
      return 0;
    }
  }

  refreshPerformanceInfo() {
    this.requestService.get('/core/performance').then((perfs) => {
      this.perfs = perfs.json();
      console.log(this.perfs);
    }).catch((err) => {
      console.error(err);
    });
  }

}
