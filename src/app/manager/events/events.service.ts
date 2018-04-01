import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { baseURL } from '../../shared/constants/base-url';
import { CommonResponse } from '../../shared/models/user';
import { Event } from './models/event';

@Injectable()
export class EventsService {
  constructor(private httpClient: HttpClient) {
  }

  private createEventUrl =  baseURL + 'events/create';

  createEvent(event: Event) {
    return this.httpClient
      .post<CommonResponse>(
        this.createEventUrl,
        event
      )
      .map(res => {
        return res;
      });
  }
}
