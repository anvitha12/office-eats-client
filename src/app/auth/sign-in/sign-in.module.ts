import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule
  ],
  declarations: [SignInComponent]
})
export class SignInModule { }
