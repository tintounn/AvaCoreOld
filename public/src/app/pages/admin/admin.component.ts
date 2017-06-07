import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private socket: SocketService, private toast: NotificationsService) { }

  ngOnInit() {
  }
}
