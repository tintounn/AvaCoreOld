import { Component, OnInit } from '@angular/core';
import { File, FileFactory } from '../../models/file.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit, OnDestroy {

  public downloads: File[] = [];

  constructor(private fileFactory: FileFactory, private socketService: SocketService) { 
    this.updateDownload = this.updateDownload.bind(this);
  }

  ngOnInit() {
    let socket = this.socketService.getSocket();
    socket.on('download:progression', this.updateDownload);

    this.fileFactory.findDownloads().then((downloads) => {
      this.downloads = downloads;
    }).catch((err) => {
      console.error(err);
    });
  }

  ngOnDestroy() {
    let socket = this.socketService.getSocket();
    socket.removeListener('download:progression', this.updateDownload);
  }

  updateDownload(download) {
    for(let i = 0; i < this.downloads.length; i++) {
      if(this.downloads[i].id == download._id) {
        this.downloads[i].speed = download.speed;
        this.downloads[i].progression = download.progression;
      }
    }
  }
}
