import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {

  public notifications: any[] = [];

  constructor(private requestService: RequestService, private socketService: SocketService) { }

  ngOnInit() {
    this.handleNotificationEvents();

    this.requestService.get('/notifications').then((data) => {
      let res = data.json();
      this.notifications = res.notifications;
    }).catch((err) => {
      console.error(err);
    });
  }

  private handleNotificationEvents() {
    let socket = this.socketService.getSocket();

    socket.on('notifications:added', (data) => {
      this.notifications.push(data);
    });

    socket.on('notifications:cleared', (data) => {
      this.notifications = [];
    });
  }
}
