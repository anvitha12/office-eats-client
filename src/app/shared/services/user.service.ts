import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User, CreateUserResponse } from '../models/user';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }
  private authorizeUrl = 'api/authorize';
  private createUserUrl = 'http://dev.sparcteam.com/catering-project/RegisterUserController/add_users';

  authorize(user: User) {
    return this.httpClient
      .post(this.authorizeUrl, JSON.stringify(user))
      .map(res => {
        console.log(res);
      });
  }

  createUser(user: User) {
    return this.httpClient
      .post<CreateUserResponse>(
        this.createUserUrl,
        JSON.stringify(user)
      )
      .map(res => {
        return res;
      });
  }
}
