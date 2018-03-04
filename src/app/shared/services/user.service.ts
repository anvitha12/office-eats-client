import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User, CreateUserResponse } from '../models/user';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }
  private authorizeUrl = 'http://dev.sparcteam.com/officeeatz.com/server/index.php/Users/login';
  private createUserUrl = 'http://dev.sparcteam.com/officeeatz.com/server/index.php/Users/register';

  authorize(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client').set('Auth-Key', 'cmsrestapi');
    const formData = new FormData();
    for ( var key in user ) {
      formData.append(key, user[key]);
    }
    return this.httpClient
      .post(this.authorizeUrl, formData, {headers: headers})
      .map(res => {
        console.log(res);
      });
  }

  createUser(user: User) {
    let headers = new HttpHeaders();
    headers = headers.set('Client-Service', 'frontend-client').set('Auth-Key', 'cmsrestapi');
    const formData = new FormData();
    for ( var key in user ) {
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