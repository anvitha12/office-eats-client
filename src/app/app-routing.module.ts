import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuard } from './shared/guards/authorize.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'manager',
    loadChildren: './manager/manager.module#ManagerModule',
    canActivate: [AuthorizeGuard],
  },
  {
    path: 'attendee',
    loadChildren: './attendee/attendee.module#AttendeeModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
