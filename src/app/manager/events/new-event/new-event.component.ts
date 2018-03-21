import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  formGroup: FormGroup;
  restaurants: any[];
  minDateValue: Date;

  constructor(private titleService: Title, private eventsService: EventsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.minDateValue = new Date();
    this.restaurants = [
      {
        restaurantId: 1,
        name: 'Gringos Mexican Kitchen',
        thumbnail: 'https://b.zmtcdn.com/data/pictures/chains/0/16881680/49f773d950c44036d9aa362c635964c4.jpg',
      },
      {
        restaurantId: 2,
        name: 'Clear Springs Restaurant',
        thumbnail: 'https://b.zmtcdn.com/data/pictures/chains/0/16881680/49f773d950c44036d9aa362c635964c4.jpg',
      },
      {
        restaurantId: 1,
        name: 'Gringos Mexican Kitchen',
        thumbnail: 'https://b.zmtcdn.com/data/pictures/chains/0/16881680/49f773d950c44036d9aa362c635964c4.jpg',
      },
      {
        restaurantId: 2,
        name: 'Clear Springs Restaurant',
        thumbnail: 'https://b.zmtcdn.com/data/pictures/chains/0/16881680/49f773d950c44036d9aa362c635964c4.jpg',
      },
      {
        restaurantId: 1,
        name: 'Gringos Mexican Kitchen',
        thumbnail: 'https://b.zmtcdn.com/data/pictures/chains/0/16881680/49f773d950c44036d9aa362c635964c4.jpg',
      },
      {
        restaurantId: 2,
        name: 'Clear Springs Restaurant',
        thumbnail: 'https://b.zmtcdn.com/data/pictures/chains/0/16881680/49f773d950c44036d9aa362c635964c4.jpg',
      }
    ];

    this.titleService.setTitle('New Event | Office Eats');

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
      restaurant: new FormControl('', [
        Validators.required
      ])
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

  onSubmit() {
    this.eventsService.createEvent(this.formGroup.value)
      .subscribe(data => {

      });
  }
}
