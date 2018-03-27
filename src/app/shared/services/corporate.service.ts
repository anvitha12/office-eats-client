import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { GetCorporatesResponse } from '../models/corporate';
import { baseURL } from '../constants/base-url';

@Injectable()
export class CorporateService {

  constructor(private httpClient: HttpClient) { }

  private getCorporatesUrl = baseURL + 'Users/corporate_info';

  getCorporates() {
    return this.httpClient
      .get<GetCorporatesResponse>(this.getCorporatesUrl)
      .map(res => {
        return res;
      });
  }
}
