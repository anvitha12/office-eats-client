import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { UserService } from '../../shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    NgBootstrapFormValidationModule
  ],
  declarations: [SignInComponent],
  providers: [
    UserService
  ]
})
export class SignInModule { }
