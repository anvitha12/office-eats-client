import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgxCarousel } from 'ngx-carousel';
import { EventsService } from '../events.service';
import { ManagerService } from '../../manager.service';
import { Resturant } from '../../models/resturant';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  formGroup: FormGroup;
  restaurants: Resturant[];
  restaurantsList: SelectItem[];
  minDateValue: Date;
  public carouselTile: NgxCarousel;

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
    this.restaurantsList = [];
    this.restaurants = [];

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 4, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
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
      budget: new FormControl({value: null, disabled: true}, [
        Validators.required
      ]),
      splitEven: new FormControl(false),
      orderType: new FormControl(null, [Validators.required]),
      attendeesList: new FormControl('', [Validators.required]),
      attendees: new FormArray([]),
      restaurants: new FormControl('', [
        Validators.required
      ])
    });

    this.managerService.getManagerCorporateResturants().subscribe(data => {
      if (data.status === 200) {
        this.restaurants = data.restaurants_details;
        for (let i = 0; i < this.restaurants.length; i++) {
          this.restaurantsList.push({label: this.restaurants[i].restaurant_name, value: this.restaurants[i].restaurant_id});
        }
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
      budget: [null],
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

  onSelectResturant(event) {
    if (event.value.length > 3) {
      event.value.splice(0, 1);
    }
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
