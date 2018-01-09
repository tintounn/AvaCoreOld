import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Rx';
import {RequestService} from "../services/request.service";

export class Alarm {

  public id: number;
  public name: string;
  public time: string;
  public days: string;

  constructor(data: any) {
    if(data.id) this.id = data._id;
    this.name = data.name;
    this.time = data.time;
    this.days = data.days;
  }
}