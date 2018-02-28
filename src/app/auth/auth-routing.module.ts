import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'sign-in'
      },
      {
        path: 'sign-in', loadChildren: './sign-in/sign-in.module#SignInModule'
      },
      {
        path: 'sign-up', loadChildren: './sign-up/sign-up.module#SignUpModule'
      },
      {
        path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
