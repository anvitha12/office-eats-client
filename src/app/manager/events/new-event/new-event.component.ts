import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private titleService: Title, private eventsService: EventsService) { }

  ngOnInit() {
    this.titleService.setTitle('New Event | Office Eats');

    this.formGroup = new FormGroup({
      meeting_title: new FormControl('', [
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
      splitevents: new FormControl('', [
        Validators.required
      ]),
      catering: new FormControl(''),
      individualorder: new FormControl(''),
      restaurant: new FormControl('', [
        Validators.required
      ])
    });
  }

  goBack() {
    history.back();
  }

  onSubmit() {
    this.eventsService.createEvent(this.formGroup.value)
      .subscribe(data => {

      });
  }
}
