import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';

@NgModule({
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    RatingModule
  ],
  declarations: [RestaurantsComponent]
})
export class RestaurantsModule { }
