import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { UserService } from '../shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ManagerRoutingModule
  ],
  declarations: [ManagerComponent],
  providers: [UserService]
})
export class ManagerModule { }
