import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {
  }

  chooseRestaurant() {
    this.router.navigate(['manager/orders/restaurant', 1]);
  }

}
