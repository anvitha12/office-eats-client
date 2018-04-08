import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { EventsService } from '../events.service';
import { EventInfo } from '../models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  public events: EventInfo[];
  public isNoEvents: boolean;

  constructor(
    private titleService: Title,
    private router: Router,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Events | Office Eats');
    this.isNoEvents = false;
    this.eventsService.getEvents().subscribe(data => {
      if (data.status === 200) {
        this.events = data.events_list_details;
        if (this.events.length) {
          this.isNoEvents = false;
        } else {
          this.isNoEvents = true;
        }
      }
    });
  }

  newEvent() {
    this.router.navigate(['/manager/events/new']);
  }
}
