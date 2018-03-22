import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Manager } from '../manager/models/manager';

@Injectable()
export class ManagerService {
  public token: string;
  public id: string;
  constructor(private httpClient: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.id = currentUser.id;
  }

  private getManagerDetailsUrl = 'http://dev.sparcteam.com/officeeatz.com/server/index.php/Users/detail/';

  getCurrentManagerDetails() {
    let headers = new HttpHeaders();
    headers = headers
      .set('Client-Service', 'frontend-client')
      .set('Auth-Key', 'cmsrestapi')
      .set('Authorization', this.token)
      .set('User-ID', this.id)
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.httpClient
      .get <Manager>(
        this.getManagerDetailsUrl + this.id,
        {
          headers: headers
        },
      )
      .map(res => {
        return res;
      }).catch(error => this.handleError(error));
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
