import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public haveNotification: boolean = false;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    let socket = this.socketService.getSocket();
    socket.on('notification', (data) => {
      this.haveNotification = true;
    });
  }

  notificationsOpened() {
    this.haveNotification = false;
  }

}
