import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { CreateEventComponent } from './create-event/create-event.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule
  ],
  declarations: [EventsComponent, CreateEventComponent]
})
export class EventsModule { }
