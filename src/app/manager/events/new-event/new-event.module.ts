import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NewEventRoutingModule } from './new-event-routing.module';
import { NewEventComponent } from './new-event.component';

import { EventsService } from '../events.service';

import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  imports: [
    CommonModule,
    NewEventRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CheckboxModule,
    RadioButtonModule,
    CarouselModule
  ],
  declarations: [NewEventComponent],
  providers: [EventsService]
})
export class NewEventModule { }
