import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { User, CommonResponse, AuthorizeResposne } from '../models/user';
import { baseURL } from '../constants/base-url';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

  private storage: StorageService;
  private authorizeUrl = baseURL + 'Users/login';
  private createUserUrl = baseURL + 'Users/register';
  private signOutUrl = baseURL + 'Users/logout';

  constructor(private httpClient: HttpClient,
    private storageService: StorageService) {
      this.storage = storageService;
  }

  public getToken(): any {
        return this.storage.retrieve('currentUser');
  }

  public resetCurrentUser() {
    this.storage.store('currentUser', '');
    this.storage.store('corporate_id', '');
  }

  authorize(user: User) {
    const formData = new FormData();
      for (const key in user) {
        if (user[key]) {
          formData.append(key, user[key]);
        }
      }
    return this.httpClient
      .post<AuthorizeResposne>(this.authorizeUrl, formData)
      .map(res => {
        if (res.token) {
          this.storage.store('currentUser', { id: res.id, token: res.token });
        }
        return res;
      });
  }

  signout() {
    return this.httpClient
      .post<CommonResponse>(
        this.signOutUrl,
        new FormData()
      )
      .map(res => {
        this.resetCurrentUser();
        return res;
      });
  }

  createUser(user: User) {
    const formData = new FormData();
    for (const key in user) {
      if (user[key]) {
        formData.append(key, user[key]);
      }
    }
    return this.httpClient
      .post<CommonResponse>(
        this.createUserUrl,
        formData
      )
      .map(res => {
        return res;
      });
  }
}
