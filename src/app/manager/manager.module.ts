import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';

import { UserService } from '../shared/services/user.service';
import { ManagerService } from './manager.service';
import { CommonInterceptor } from '../shared/interceptors/common.interceptor';
import { TokenInterceptor } from '../shared/interceptors/token.interceptor';

import { SharedModule } from '../shared/shared.module';
import { ManagerGuard } from './manager.guard';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ManagerRoutingModule
  ],
  declarations: [ManagerComponent, SidebarComponent],
  providers: [
    UserService, ManagerService, ManagerGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class ManagerModule { }
