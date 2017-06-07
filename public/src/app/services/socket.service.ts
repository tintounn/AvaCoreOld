import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: any;
  private options: io.ConnectOpts = {};

  constructor() {
  }

  connect(port: string, token: string): Promise<void> {
    this.options.upgrade = true;
    this.options.query = 'token=' + token;
    return new Promise<void>((resolve, reject) => {
      this.socket = io.connect(window.location.hostname + ':' + port, this.options);

      this.on('connect', resolve);
      this.on('error', reject);
    });
  }

  on(event: string, func: any) {
    this.socket.on(event, func);
  }
}
