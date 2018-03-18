import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEventRoutingModule } from './new-event-routing.module';
import { NewEventComponent } from './new-event.component';

import { SharedModule } from '../../../shared/shared.module';

import { EventsService } from '../events.service';

@NgModule({
  imports: [
    CommonModule,
    NewEventRoutingModule,
    SharedModule
  ],
  declarations: [NewEventComponent],
  providers: [EventsService]
})
export class NewEventModule { }
