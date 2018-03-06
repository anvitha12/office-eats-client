import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventListRoutingModule } from './event-list-routing.module';
import { EventListComponent } from './event-list.component';

@NgModule({
  imports: [
    CommonModule,
    EventListRoutingModule
  ],
  declarations: [EventListComponent]
})
export class EventListModule { }
