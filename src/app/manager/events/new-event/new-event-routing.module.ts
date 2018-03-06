import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event.component';

const routes: Routes = [
  {
    path: '', component: NewEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewEventRoutingModule { }
