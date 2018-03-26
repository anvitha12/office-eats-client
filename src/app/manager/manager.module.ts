import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from './manager.service';
import { SharedModule } from '../shared/shared.module';
import { ManagerGuard } from './manager.guard';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ManagerRoutingModule
  ],
  declarations: [ManagerComponent],
  providers: [UserService, ManagerService, ManagerGuard]
})
export class ManagerModule { }
