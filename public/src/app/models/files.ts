import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { RequestService } from '../services/request.service';

export class Files {
  public name: string;
  public size: number;
  public directory: boolean = false;

  constructor(data: any) {
    this.name = data.name;
    this.size = data.size;
    if(data.directory) this.directory = data.directory;
  }
}

export class Download extends Files {
  public progression: number;
  public speed: number;
  public id: number;

  constructor(data: any) {
    super(data);
    this.id = data.id;
    this.progression = 0;
    this.speed = 0;
  }
}

@Injectable()
export class FilesFactory {
  constructor(private request: RequestService) { }

  delete(path: string): Promise<any> {
    return this.request.delete('/nas', 'path=' + path);
  }

  create(path: string, folder: string): Promise<Files> {
    return this.request.post('/nas', {folder: folder}, 'path=' + path).then(response => new Files(response.json()));
  }

  open(path: string): Promise<Files[]> {
    return this.request.get('/nas', 'path=' + path).then(response => response.json().map((elt) => { return new Files(elt); }));
  }

  download(path: string, url: string): Promise<Download> {
    return this.request.post('/download', {path: path, url: url}).then(response => new Download(response.json()));
  }

  findDownloads(): Promise<Download[]> {
    return this.request.get('/download').then(response => response.json().map((elt) => { return new Download(elt); }));
  }

  cancelDownload(id: number): Promise<void> {
    return this.request.delete('/download/' + id);
  }
}
