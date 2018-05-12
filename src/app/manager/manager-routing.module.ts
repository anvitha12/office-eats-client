import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { ManagerGuard } from './manager.guard';

const routes: Routes = [
  {
    path: '', component: ManagerComponent, canActivate: [ ManagerGuard ],
    children: [
      {
        path: '', redirectTo: 'manager', pathMatch: 'full'
      },
      {
        path: '', loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'events', loadChildren: './events/events.module#EventsModule'
      },
      {
        path: 'orders', loadChildren: './orders/orders.module#OrdersModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
