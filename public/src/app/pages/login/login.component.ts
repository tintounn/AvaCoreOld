import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

import { RequestService } from '../../services/request.service';
import { SocketService } from '../../services/socket.service';
import { GoogleMapService } from '../../services/google-map.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private code: string = "";

  constructor(private request: RequestService, private router: Router, private socket: SocketService, private toast: NotificationsService, private googleMap: GoogleMapService) { }

  ngOnInit() {
  }

  login() {
    this.request.post('/auth', {code: this.code}).then((res) => {
      let data = res.json();
      this.request.setToken(data.token);
      this.googleMap.inject("AIzaSyDvfe9ZAzba06hltUJlwiVrL75MsiEB6v0", () => {
        this.router.navigateByUrl('/admin/home');
      });
    }).catch((err) => {
      this.toast.error('Oups!', 'Une erreur s\'est produite');
    });
  }
}
