import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { SocketService } from '../../../../services/socket.service';
import { RequestService } from '../../../../services/request.service';
import { Files, FilesFactory } from '../../../../models/files';

declare var jQuery: any;

@Component({
  selector: 'file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit, AfterViewInit {
  private current: string = "";
  private folders: Array<any> = [];
  private folder: string = "";
  private files: Array<Files>;
  private file: any;
  @Output('folderChange') folderChange = new EventEmitter<string>();
  @Output('fileOpen') fileOpen = new EventEmitter<Files>();

  constructor(private fileFactory: FilesFactory, private request: RequestService) { }

  ngOnInit() {
    this.request.get('/config/nas:root').then((res) => {
      this.folders.push({path: res.json(), name: 'root'});
      this.goTo(res.json());
    }).catch((err) => {
      console.log(err);
    });
  }

  ngAfterViewInit() {
    jQuery('#fileModal').modal({show: false});
  }

  deleteFile(index: number) {
    this.file = null;
    this.fileFactory.delete(this.current + '/' + this.files[index].name).then(() => {
      this.files.splice(index, 1);
    }).catch((err) => {
      console.log(err);
    });
  }

  createFolder() {
    this.fileFactory.create(this.current, this.folder).then((res) => {
      this.files.push(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  openFile(index: number) {
    this.file = {index: index, data: this.files[index]};
    jQuery('#fileModal').modal('show');
  }

  openFolder(index: number) {
    let path = this.current + '/' + this.files[index].name;
    this.folders.push({path: path, name: this.files[index].name});
    this.goTo(path); 
  }

  backTo(index: number) {
    let diff = this.folders.length - index;
    let path = this.folders[index].path;
    this.folders.splice(index + 1, diff);
    this.goTo(path);
  }

  goTo(path: string) {
    this.current = path;
    this.folderChange.emit(path);
    this.fileFactory.open(path).then((files) => {
      this.files = files;
    }).catch((err) => {
      console.log(err);
    });
  }

  addFile(file: Files) {
    this.files.push(file);
  }
}
