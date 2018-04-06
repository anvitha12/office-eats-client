import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Manager, ManagerDetails } from '../manager/models/manager';
import { GetRestaurantsResponse } from '../manager/models/restaurant';
import { baseURL } from '../shared/constants/base-url';
import { UserService } from '../shared/services/user.service';

import { StorageService } from '../shared/services/storage.service';

@Injectable()
export class ManagerService {

  public managerDetails: ManagerDetails;
  private storage: StorageService;

  constructor(private httpClient: HttpClient,
    private userService: UserService,
    private storageService: StorageService) {
      this.storage = storageService;
  }

  private getManagerDetailsUrl = baseURL + 'Users/detail/';
  private getManagerCorporateResturantsUrl = baseURL + 'CreateEvents/restaurants_info';

  public _setManagerDetails(managerDetails: ManagerDetails) {
    this.managerDetails = managerDetails;
  }

  public _getManagerDetails() {
    return this.managerDetails;
  }

  getManagerDetails() {
    return this.httpClient
      .get <Manager>(
        this.getManagerDetailsUrl + this.userService.getToken().id
      )
      .map(res => {
        if (res.user_details.corporate_id) {
          this.storage.store('corporate_id', res.user_details.corporate_id);
        }
        return res;
      }).catch(error => this.handleError(error));
  }

  getManagerCorporateResturants() {
    let headers = new HttpHeaders();
    headers = headers
      .set('Corporate-ID', this.storage.retrieve('corporate_id'));

    return this.httpClient
      .get <GetRestaurantsResponse>(
        this.getManagerCorporateResturantsUrl,
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
