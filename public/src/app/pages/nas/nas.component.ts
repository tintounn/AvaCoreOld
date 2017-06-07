import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { SocketService } from '../../services/socket.service';
import { RequestService } from '../../services/request.service';
import { FileManagerComponent } from './components/file-manager/file-manager.component';
import { Download, Files, FilesFactory } from '../../models/files';

@Component({
  selector: 'app-nas',
  templateUrl: './nas.component.html',
  styleUrls: ['./nas.component.css']
})
export class NasComponent implements OnInit {
  @ViewChild('fileManager') fileManager: FileManagerComponent;
  private downloads: Array<Download>;
  private url: string = "";
  private folder: string;

  constructor(private socket: SocketService, private request: RequestService, 
              private fileFactory: FilesFactory, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.fileFactory.findDownloads().then((downloads) => {
      this.downloads = downloads;

      this.socket.on('download:progression', (data) => {
        for(let i in this.downloads) {
          if(this.downloads[i].id == data.id) this.downloads[i].progression = data.progression;
        }
      });

      this.socket.on('download:finish', (data) => {
        for(let i in this.downloads) {
          if(this.downloads[i].id == data.id) {
            this.fileManager.addFile(new Files(this.downloads[i]));
            this.downloads.splice(parseInt(i), 1);
          }
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  download() {
    this.fileFactory.download(this.folder, this.url).then((download) => {
      this.downloads.push(download);
    }).catch((err) => {
      console.log(err);
    });
  }

  getProgressionStyle(index: number): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('height: 3px; background: #9999FF; width: ' + this.downloads[index].progression + '%;');
  }

  folderChanged(e: string) {
    this.folder = e;
  }
}
