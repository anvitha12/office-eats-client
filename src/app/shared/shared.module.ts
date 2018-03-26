import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';

import { StorageService} from './services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    NgBootstrapFormValidationModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    NgBootstrapFormValidationModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: SharedModule,
        providers: [
          Title,
          StorageService
        ]
    };
  }
 }
