import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User, CreateUserResponse } from '../models/user';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }
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
      .post<CreateUserResponse>(this.authorizeUrl, formData, { headers: headers })
      .map(res => {
        console.log(res);
        return res;
      });
  }

  signout() {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client').set('Auth-Key', 'cmsrestapi').set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.httpClient
      .post<CreateUserResponse>(
        this.signOutUrl,
        new FormData(),
        {
          headers: headers
        }
      )
      .map(res => {
        console.log(res)
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
      .post<CreateUserResponse>(
        this.createUserUrl,
        formData,
        {
          headers: headers
        }
      )
      .map(res => {
        console.log(res)
        return res;
      });
  }
}