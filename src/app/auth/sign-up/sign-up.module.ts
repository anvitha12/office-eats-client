import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { UserService } from '../../shared/services/user.service';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SignUpRoutingModule,
  ],
  declarations: [SignUpComponent],
  providers: [
    UserService
  ]
})
export class SignUpModule { }
