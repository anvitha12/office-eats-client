import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NewEventRoutingModule } from './new-event-routing.module';
import { NewEventComponent } from './new-event.component';

import { EventsService } from '../events.service';
import { ManagerService } from '../../manager.service';

import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  imports: [
    CommonModule,
    NewEventRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    SelectButtonModule
  ],
  declarations: [NewEventComponent],
  providers: [EventsService, ManagerService]
})
export class NewEventModule { }
