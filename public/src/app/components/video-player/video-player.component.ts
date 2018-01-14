import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @Input('url') url: string;
  @ViewChild('videoplayer') videoplayer: any;

  constructor() { }

  ngOnInit() {
    this.videoplayer.nativeElement.src = this.url;
  }
}
