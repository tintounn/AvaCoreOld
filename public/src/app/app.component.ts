import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RequestService } from './services/request.service';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public options = {
      position: ["bottom", "right"],
      timeOut: 5000,
      lastOnBottom: true
  }

  constructor(private router: Router, private request: RequestService, private socket: SocketService) {}

  ngOnInit() {
    this.router.navigateByUrl('/login');
  }
}
