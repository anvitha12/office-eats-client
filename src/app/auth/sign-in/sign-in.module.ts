import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { UserService } from '../../shared/services/user.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SignInRoutingModule,
  ],
  declarations: [SignInComponent],
  providers: [
    UserService
  ]
})
export class SignInModule { }
