import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  private socket: any;

  constructor() { }

  init() {
    this.socket = io("/admins", {transports: ['websocket'], path: '/admins'});
  }

  getSocket() : any {
    return this.socket;
  }
}
