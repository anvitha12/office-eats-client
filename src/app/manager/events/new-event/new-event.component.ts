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
  attendees: FormArray;

  constructor(private titleService: Title, private eventsService: EventsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
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
      budget_details: new FormControl('', [
        Validators.required
      ]),
      splitEven: new FormControl(''),
      catering: new FormControl(''),
      individualOrder: new FormControl(''),
      attendees: this.formBuilder.array([]),
      restaurant: new FormControl('', [
        Validators.required
      ])
    });
  }

  goBack() {
    history.back();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      email: '',
      budget: ''
    });
  }

  addAttendee() {
    this.attendees = this.formGroup.get('attendees') as FormArray;
    this.attendees.push(this.createItem());
  }

  onSubmit() {
    this.eventsService.createEvent(this.formGroup.value)
      .subscribe(data => {

      });
  }
}
