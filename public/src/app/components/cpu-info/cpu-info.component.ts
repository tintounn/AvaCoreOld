import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-cpu-info',
  templateUrl: './cpu-info.component.html',
  styleUrls: ['./cpu-info.component.css']
})
export class CpuInfoComponent implements OnInit {

  public cpus: any[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.get('/core/performance').then((cpus) => {
      console.log(cpus.json());
    }).catch((err) => {
      console.error(err);
    });
  }

}
