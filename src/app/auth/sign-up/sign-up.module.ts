import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

import { UserService } from '../../shared/services/user.service';
import { CommonInterceptor } from '../../shared/interceptors/common.interceptor';

import { CorporateService } from '../../shared/services/corporate.service';


import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SignUpRoutingModule
  ],
  declarations: [SignUpComponent],
  providers: [
    UserService,
    CorporateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    }
  ]
})
export class SignUpModule { }
