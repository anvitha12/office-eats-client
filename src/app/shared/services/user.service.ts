import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User, CommonResponse, AuthorizeResposne } from '../models/user';
import { baseURL } from '../constants/base-url';

@Injectable()
export class UserService {
  public token: string;
  constructor(private httpClient: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  private authorizeUrl = baseURL + 'Users/login';
  private createUserUrl = baseURL + 'Users/register';
  private signOutUrl = baseURL + 'Users/logout';

  authorize(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client').set('Auth-Key', 'cmsrestapi');
    const formData = new FormData();
      for (const key in user) {
        if (user[key]) {
          formData.append(key, user[key]);
        }
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
    headers = headers.set('Client-Service', 'frontend-client')
    .set('Auth-Key', 'cmsrestapi')
    .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
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
        localStorage.clear();
        return res;
      });
  }

  createUser(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client').set('Auth-Key', 'cmsrestapi');
    const formData = new FormData();
    for (const key in user) {
      if (user[key]) {
        formData.append(key, user[key]);
      }
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
