import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

import { UserService } from '../../shared/services/user.service';
import { CommonInterceptor } from '../../shared/interceptors/common.interceptor';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SignInRoutingModule,
  ],
  declarations: [SignInComponent],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    }
  ]
})
export class SignInModule { }
