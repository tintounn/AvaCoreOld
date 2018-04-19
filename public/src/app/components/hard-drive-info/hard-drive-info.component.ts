import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-hard-drive-info',
  templateUrl: './hard-drive-info.component.html',
  styleUrls: ['./hard-drive-info.component.css']
})
export class HardDriveInfoComponent implements OnInit {

  public hardDrives: any[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.requestService.get('/core/harddrive').then((hardDrives) => {
      this.hardDrives = hardDrives.json();
    }).catch((err) => {
      console.error(err);
    });
  }

  getValue(item: any) {   
    return 0;
    //return 100 - ((item.sizes.available/item.sizes.total) * 100);
  }

}
