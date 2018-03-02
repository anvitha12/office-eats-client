import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User} from '../models/user';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }
  private authorizeUrl = 'api/authorize';
  private createUserUrl = 'http://dev.sparcteam.com/catering-project/RegisterUserController/add_users';

  authorize(user: User){
    return this.httpClient
      .post(this.authorizeUrl, JSON.stringify(user))
      .map(res =>{
        console.log(res)
      })
      
  }

  createUser(user: User) {
    var form = new FormData();
    form.append('email', user.email);
    form.append('gender', user.gender);
    form.append('firstname', user.firstname);
    form.append('lastname', user.lastname);
    form.append('phone', user.phone);
    form.append('password', user.password);
    return this.httpClient
      .post(
        this.createUserUrl, 
        form,
        {
          headers: new HttpHeaders({
            'Content-Type':  'application/x-www-form-urlencoded;charset=UTF-8',
          })
        }
      )
      .map(res => {
        console.log(res)
      })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
