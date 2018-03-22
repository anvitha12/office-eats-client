import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';
import { UserService } from '../../shared/services/user.service';
import { CorporateService } from '../../shared/services/corporate.service';
import {DropdownModule} from 'primeng/dropdown';


import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SignUpRoutingModule,
    DropdownModule,
  ],
  declarations: [SignUpComponent],
  providers: [
    UserService,
    CorporateService
  ]
})
export class SignUpModule { }
