import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEventRoutingModule } from './new-event-routing.module';
import { NewEventComponent } from './new-event.component';

@NgModule({
  imports: [
    CommonModule,
    NewEventRoutingModule
  ],
  declarations: [NewEventComponent]
})
export class NewEventModule { }
