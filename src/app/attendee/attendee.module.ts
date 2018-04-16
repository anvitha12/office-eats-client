import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendeeRoutingModule } from './attendee-routing.module';
import { AttendeeComponent } from './attendee.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AttendeeRoutingModule,
    SharedModule,
  ],
  declarations: [AttendeeComponent]
})
export class AttendeeModule { }
