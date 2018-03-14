import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

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

  getManagerDetails () {
    let headers = new HttpHeaders();
    headers = headers
    .set('Client-Service', 'frontend-client')
    .set('Auth-Key', 'cmsrestapi')
    .set('Authorization', this.token)
    .set('User-ID', this.id)
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.httpClient
      .get(
        this.getManagerDetailsUrl + this.id,
        {
          headers: headers
        }
      )
      .map(res => {
        console.log(res);
        return res;
      });
  }
}
