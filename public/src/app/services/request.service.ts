import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestService {
  private prefix: string;
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http) {
    this.prefix = '/api';
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  private generateUrl(route: string) {
    return this.prefix + route;
  }

  setToken(token: string) {
    this.headers.set('Authorization', token);
  }

  get(route: string): Promise<any> {
    return this.http.get(this.generateUrl(route), this.options).toPromise();
  }

  post(route: string, body: any): Promise<any> {
    return this.http.post(this.generateUrl(route), JSON.stringify(body), this.options).toPromise();
  }

  delete(route: string): Promise<any> {
    return this.http.delete(this.generateUrl(route), this.options).toPromise();
  }

  put(route: string, body: any): Promise<any> {
    return this.http.put(this.generateUrl(route), JSON.stringify(body), this.options).toPromise();
  }
}