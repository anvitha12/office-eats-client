import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
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
  resturantsList: SelectItem[];
  minDateValue: Date;

  constructor(
    private titleService: Title,
    private eventsService: EventsService,
    private managerService: ManagerService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.titleService.setTitle('New Event | Office Eats');
    this.minDateValue = new Date();
    this.resturantsList = [];
    this.formGroup = new FormGroup({
      meetingTitle: new FormControl('', [
        Validators.required,
      ]),
      date: new FormControl('', [
        Validators.required
      ]),
      time: new FormControl('', [
        Validators.required
      ]),
      venue: new FormControl('', [
        Validators.required
      ]),
      budget: new FormControl({value: '', disabled: true}, [
        Validators.required
      ]),
      splitEven: new FormControl(false),
      catering: new FormControl(false),
      individualOrder: new FormControl(false),
      attendeesList: new FormControl(''),
      attendees: new FormArray([]),
      restaurants: new FormControl('', [
        Validators.required
      ])
    });

    this.managerService.getManagerCorporateResturants().subscribe(data => {
      if (data.status === 200) {
        this.restaurants = data.restaurants_details;
        for (let i = 0; i < this.restaurants.length; i++) {
          this.resturantsList.push({label: this.restaurants[i].restaurant_name, value: this.restaurants[i].restaurant_id});
        }
      }
    });
  }

  goBack() {
    history.back();
  }

  createAttende(email): FormGroup {
    return this.formBuilder.group({
      email: [email, Validators.required],
      name: ['', Validators.required],
      budget: ['', Validators.required],
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

  onOrderTypeChange(orderType: string) {
    if (orderType === 'isIndividualOrder') {
      this.formGroup.patchValue({
        catering: false
      });
    } else if (orderType === 'isCatering') {
      this.formGroup.patchValue({
        individualOrder: false
      });
    }
  }

  onSplitEvenChange() {
    const ctrl = this.formGroup.get('budget');
    this.formGroup.value.splitEven ? ctrl.enable() : ctrl.disable();
  }

  onSelectResturant(event) {
    if (event.value.length > 3) {
      event.value.splice(0, 1);
    }
  }

  createEvent() {
    this.eventsService.createEvent(this.formGroup.value)
      .subscribe(data => {

      });
  }
}
