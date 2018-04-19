import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SocketService } from './services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 

  constructor(private socketService: SocketService, private router: Router) { }


  ngOnInit() {
    this.socketService.init();
    this.router.navigateByUrl('/admin');
  }

}
