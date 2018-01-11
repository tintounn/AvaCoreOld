import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-network-info',
  templateUrl: './network-info.component.html',
  styleUrls: ['./network-info.component.css']
})
export class NetworkInfoComponent implements OnInit {

  public networks: any[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.get('/core/network').then((networks) => {
      console.log(networks.json());
    }).catch((err) => {
      console.error(err);
    });
  }

}
