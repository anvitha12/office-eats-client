import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgxCarousel } from 'ngx-carousel';
import { EventsService } from '../events.service';
import { ManagerService } from '../../manager.service';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  formGroup: FormGroup;
  restaurants: Restaurant[];
  selectedRestaurants: Restaurant[];
  minDateValue: Date;
  public carouselTile: NgxCarousel;
  managerEmail: string;

  constructor(
    private router: Router,
    public toastr: ToastsManager,
    private titleService: Title,
    private eventsService: EventsService,
    private managerService: ManagerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.titleService.setTitle('New Event | Office Eats');

    this.minDateValue = new Date();
    this.restaurants = [];
    this.selectedRestaurants = [];
    this.managerEmail = this.managerService.manager.u_email;

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 4, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };

    this.formGroup = new FormGroup({
      meetingTitle: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      date: new FormControl('', [
        Validators.required
      ]),
      time: new FormControl('', [
        Validators.required
      ]),
      venue: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      budget: new FormControl('', [
        Validators.required
      ]),
      splitEven: new FormControl(false),
      orderType: new FormControl('', [Validators.required]),
      attendeesList: new FormControl('', [Validators.required]),
      attendees: new FormArray([this.createAttende(this.managerEmail)]),
      selectedRestaurants: this.formBuilder.array([], Validators.required)
    });

    this.managerService.getManagerCorporateResturants().subscribe(data => {
      if (data.status === 200) {
        this.restaurants = data.restaurants_details;
      }
    });
  }

  goBack() {
    history.back();
  }

  createAttende(email): FormGroup {
    return this.formBuilder.group({
      email: [email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      name: ['', Validators.required],
      budget: [''],
      foodPreference: ['', Validators.required]
    });
  }

  addAttendee() {
    if (this.formGroup.value.attendeesList) {
      const attendees = this.formGroup.value.attendeesList.split(';');
      if (attendees && attendees.length) {
        for (let i = 0; i < attendees.length; i++) {
          const email = attendees[i].trim();
          if (email && email.length) {
            if (this.formGroup.value.attendees.length) {
              const isEmailExists = this.formGroup.get('attendees').value.some(attende => {
                return attende.email === email;
              });
              if (!isEmailExists) {
                (<FormArray>this.formGroup.get('attendees')).push(this.createAttende(email));
              }
            } else {
              (<FormArray>this.formGroup.get('attendees')).push(this.createAttende(email));
            }
          }
        }
      }
    }
  }

  removeAttendee (index: number) {
    const control = <FormArray>this.formGroup.controls['attendees'];
    // remove the chosen row
    control.removeAt(index);
  }

  onRestaurantSelect(restaurant: Restaurant) {
    restaurant.checked = !restaurant.checked;
    const selectedRestaurantsFormArray = <FormArray>this.formGroup.controls.selectedRestaurants;
    const index = selectedRestaurantsFormArray.controls.findIndex(x => x.value === restaurant.restaurant_id);
    if (restaurant.checked) {
      if (selectedRestaurantsFormArray.length >= 3)  {
        selectedRestaurantsFormArray.removeAt(0);
        this.selectedRestaurants.splice(0, 1);
        this.restaurants[0].checked = false;
      }
      selectedRestaurantsFormArray.push(new FormControl(restaurant.restaurant_id));
      this.selectedRestaurants.push(restaurant);
    } else {
      selectedRestaurantsFormArray.removeAt(index);
      this.selectedRestaurants.splice(index, 1);
      restaurant.checked = false;
    }
  }

  removeSelectedRestaurant(restaurant: Restaurant, index: number) {
    this.selectedRestaurants.splice(index, 1);
    const selectedRestaurantsFormArray = <FormArray>this.formGroup.controls.selectedRestaurants;
    const i = selectedRestaurantsFormArray.controls.findIndex(x => x.value === restaurant.restaurant_id);
    const i1 = this.restaurants.findIndex(x => x.restaurant_id === restaurant.restaurant_id);
    this.restaurants[i1].checked = false;
    selectedRestaurantsFormArray.removeAt(i);
  }

  createEvent() {
    if (this.formGroup.valid) {
      this.eventsService.createEvent(this.formGroup.value)
      .subscribe(data => {
        if (data.status === 201) {
          this.toastr.success(data.message, 'Success!', { dismiss: 'controlled', showCloseButton: true, toastLife: 4000 });
          this.router.navigate(['/manager']);
        }
      }
    );
    }
  }

  isFieldValid(field: string) {
    return !this.formGroup.get(field).valid && this.formGroup.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }

  isDynmaicFieldValid(field: string, i: number) {
    return !this.formGroup.get('attendees').get(i.toString()).get(field).valid
    && this.formGroup.get('attendees').get(i.toString()).get(field).touched;
  }

  displayDynamicFieldCss(field: string, i: number) {
    return {
      'has-error': this.isDynmaicFieldValid(field, i)
    };
  }
}
