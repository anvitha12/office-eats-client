import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, Title }  from '@angular/platform-browser';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { UserService } from '../../shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    NgBootstrapFormValidationModule
  ],
  declarations: [SignInComponent],
  providers: [
    Title,
    UserService
  ]
})
export class SignInModule { }
