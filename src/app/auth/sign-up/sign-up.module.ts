import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title }  from '@angular/platform-browser';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { UserService } from '../../shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    NgBootstrapFormValidationModule
  ],
  declarations: [SignUpComponent],
  providers: [
    Title,
    UserService
  ]
})
export class SignUpModule { }
