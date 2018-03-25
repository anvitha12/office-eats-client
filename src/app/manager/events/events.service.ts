import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { baseURL } from '../../shared/constants/base-url';
import { CommonResponse } from '../../shared/models/user';
import { Event } from './models/event';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class EventsService {
  constructor(private httpClient: HttpClient,
    private userService: UserService) {
  }

  private createEventUrl =  baseURL + 'CreateEvents/createEvent';

  createEvent(event: Event) {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client')
    .set('Auth-Key', 'cmsrestapi')
    .set('Authorization', this.userService.getToken().token)
    .set('User-ID', this.userService.getToken().id)
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
