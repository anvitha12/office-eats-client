import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { NewEventRoutingModule } from './new-event-routing.module';
import { NewEventComponent } from './new-event.component';

import { EventsService } from '../events.service';
import { ManagerService } from '../../manager.service';

import { CommonInterceptor } from '../../../shared/interceptors/common.interceptor';
import { TokenInterceptor } from '../../../shared/interceptors/token.interceptor';

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
    ToastModule,
    NgBootstrapFormValidationModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    SelectButtonModule
  ],
  declarations: [NewEventComponent],
  providers: [
    EventsService,
    ManagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class NewEventModule { }
