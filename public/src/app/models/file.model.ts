import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";

export class File {
  
  public id: string;
  public url: string;
  public name: string;
  public size: number;
  public path: string;

  constructor(data?: any) {
    if(data) {
      this.id = data._id;
      this.name = data.name;
      this.size = data.size;
      this.path = data.path;
    }
  }
}