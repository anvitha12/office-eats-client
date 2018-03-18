import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { CommonResponse } from '../../shared/models/user';
import { Event } from './models/event';

@Injectable()
export class EventsService {

  public token: string;
  public id: string;
  constructor(private httpClient: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.id = currentUser.id;
  }

  private createEventUrl = 'http://dev.sparcteam.com/officeeatz.com/server/index.php/CreateEvents/createEvent';

  createEvent(event: Event) {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client')
    .set('Auth-Key', 'cmsrestapi')
    .set('Authorization', this.token)
    .set('User-ID', this.id)
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const formData = new FormData();
    for (const key in event) {
      if (event[key]) {
        formData.append(key, event[key]);
      }
    }
    return this.httpClient
      .post<CommonResponse>(
        this.createEventUrl,
        formData,
        {
          headers: headers
        }
      )
      .map(res => {
        return res;
      });
  }
}
