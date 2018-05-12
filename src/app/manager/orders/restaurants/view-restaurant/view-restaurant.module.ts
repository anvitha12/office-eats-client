import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRestaurantRoutingModule } from './view-restaurant-routing.module';
import { ViewRestaurantComponent } from './view-restaurant.component';

@NgModule({
  imports: [
    CommonModule,
    ViewRestaurantRoutingModule
  ],
  declarations: [ViewRestaurantComponent]
})
export class ViewRestaurantModule { }
