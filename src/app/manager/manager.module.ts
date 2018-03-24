import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from './manager.service';

import { ManagerGuard } from './manager.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ManagerRoutingModule
  ],
  declarations: [ManagerComponent],
  providers: [UserService, ManagerService, ManagerGuard]
})
export class ManagerModule { }
