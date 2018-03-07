import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User, CommonResponse, AuthorizeResposne } from '../models/user';

@Injectable()
export class UserService {
  public token: string;
  constructor(private httpClient: HttpClient) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  private authorizeUrl = 'http://dev.sparcteam.com/officeeatz.com/server/index.php/Users/login';
  private createUserUrl = 'http://dev.sparcteam.com/officeeatz.com/server/index.php/Users/register';
  private signOutUrl = "http://dev.sparcteam.com/officeeatz.com/server/index.php/Users/logout";

  authorize(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client').set('Auth-Key', 'cmsrestapi');
    const formData = new FormData();
    for (var key in user) {
      formData.append(key, user[key]);
    }
    return this.httpClient
      .post<AuthorizeResposne>(this.authorizeUrl, formData, { headers: headers })
      .map(res => {
        if (res.token) {
          localStorage.setItem('currentUser', JSON.stringify({ id: res.id, token: res.token }));
        }
        return res;
      });
  }

  signout() {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client').set('Auth-Key', 'cmsrestapi').set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.httpClient
      .post<CommonResponse>(
        this.signOutUrl,
        new FormData(),
        {
          headers: headers
        }
      )
      .map(res => {
        this.token = null;
        localStorage.removeItem('currentUser');
        return res;
      });
  }

  createUser(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client').set('Auth-Key', 'cmsrestapi');
    const formData = new FormData();
    for (var key in user) {
      formData.append(key, user[key]);
    }
    return this.httpClient
      .post<CommonResponse>(
        this.createUserUrl,
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