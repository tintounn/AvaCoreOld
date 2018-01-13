import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";

export class File {
  
  public id: string;
  public fileId: string;
  public url: string;
  public name: string;
  public size: number;
  public path: string;

  public speed: number = 0;
  public progression: number = 0;

  constructor(data?: any) {
    if(data) {
      this.fileId = data._id;
      this.id = data._id;
      this.name = data.name;
      this.size = data.size;
      this.path = data.path;
    }
  }
}

@Injectable()
export class FileFactory {

  constructor(private requestService: RequestService) {}

  public findDownloads() : Promise<File[]> {
    return this.requestService.get('/nas/downloads').then((response) => response.json().downloads.map((elt) => {return new File(elt.file)}));
  }
}