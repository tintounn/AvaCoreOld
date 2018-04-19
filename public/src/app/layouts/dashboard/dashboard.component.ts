import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { RequestService } from '../../services/request.service';
import { NotificationsListComponent } from '../../components/notifications-list/notifications-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public haveNotification: boolean = false;

  constructor(private socketService: SocketService, private requestService: RequestService) { }

  ngOnInit() {
    let socket = this.socketService.getSocket();
    socket.on('notifications:added', (data) => {
      this.haveNotification = true;
    });
  }

  notificationsOpened() {
    this.haveNotification = false;
  }

  removeAllNotifications() {
    this.requestService.delete('/notifications').then(() => {
      console.log('Notifictions cleared');
    }).catch((err) => {
      console.error(err);
    });
  }
}
