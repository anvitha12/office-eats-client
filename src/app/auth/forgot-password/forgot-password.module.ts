import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { UserService } from '../../shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    NgBootstrapFormValidationModule
  ],
  declarations: [ForgotPasswordComponent],
  providers: [
    Title,
    UserService
  ]
})
export class ForgotPasswordModule { }
