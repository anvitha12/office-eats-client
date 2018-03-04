import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  {
    path: '', component: ManagerComponent,
    children: [
      {
        path: '', redirectTo: '/manager', pathMatch: 'full'
      },
      {
        path: '', loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'events', loadChildren: './events/events.module#EventsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
