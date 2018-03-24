import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Manager, ManagerDetails } from '../manager/models/manager';
import { GetResturantsResponse } from '../manager/models/resturant';
import { baseURL } from '../shared/constants/base-url';

@Injectable()
export class ManagerService {

  public token: string;
  public id: string;
  public corporate_id: string;
  public managerDetails: ManagerDetails;

  constructor(private httpClient: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser.token;
    this.id = currentUser.id;
    this.corporate_id = localStorage.getItem('corporate_id');
  }

  private getManagerDetailsUrl = baseURL + 'Users/detail/';
  private getManagerCorporateResturantsUrl = baseURL + 'CreateEvents/restaurants_info';

  public _setManagerDetails(managerDetails: ManagerDetails) {
    this.managerDetails = managerDetails;
    localStorage.setItem('corporate_id', this.managerDetails.corporate_id.toString());
  }

  public _getManagerDetails() {
    return this.managerDetails;
  }

  getManagerDetails() {
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

  getManagerCorporateResturants() {
    let headers = new HttpHeaders();
    headers = headers
      .set('Client-Service', 'frontend-client')
      .set('Auth-Key', 'cmsrestapi')
      .set('Authorization', this.token)
      .set('User-ID', this.id)
      .set('Corporate-ID', this.corporate_id || '')
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.httpClient
      .get <GetResturantsResponse>(
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
