import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User} from '../models/user';

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
    const form = new FormData();
    form.append('user_role_type', user.user_role_type);
    form.append('firstname', user.firstname);
    form.append('email_id', user.email_id);
    form.append('lastname', user.lastname);
    form.append('gender', user.gender);
    form.append('phone', user.phone);
    form.append('password', user.password);
    return this.httpClient
      .post(
        this.createUserUrl,
        form,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache'
          })
        },
      )
      .map(res => {
        console.log(res);
      });
  }
}
