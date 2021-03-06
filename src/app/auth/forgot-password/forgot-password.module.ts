import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { UserService } from '../../shared/services/user.service';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule
  ],
  declarations: [ForgotPasswordComponent],
  providers: [
    UserService
  ]
})
export class ForgotPasswordModule { }
