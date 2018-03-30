import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendeeRoutingModule } from './attendee-routing.module';
import { AttendeeComponent } from './attendee.component';

@NgModule({
  imports: [
    CommonModule,
    AttendeeRoutingModule
  ],
  declarations: [AttendeeComponent]
})
export class AttendeeModule { }
