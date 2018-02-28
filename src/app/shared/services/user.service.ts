import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User} from '../models/user'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private authorizeUrl = 'api/authorize';
  private createUserUrl = 'api/createUser';

  authorize(user: User): Promise<User> {
    return this.http
      .post(this.authorizeUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  createUser(user: User): Promise<User> {
    return this.http
      .post(this.createUserUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
