import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfirmationService } from 'primeng/api';
import { EventsService } from '../events.service';
import { EventInfo } from '../models/event';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  providers: [ConfirmationService]
})
export class EventListComponent implements OnInit {
  public events: EventInfo[];
  public isNoEvents: boolean;

  constructor(
    private titleService: Title,
    private router: Router,
    public toastr: ToastsManager,
    private eventsService: EventsService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Events | Office Eats');
    this.isNoEvents = false;
    this.getEvents();
  }

  getEvents() {
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

  removeEvent(event: EventInfo) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this event?',
      accept: () => {
         this.eventsService.deleteEvent(event.event_id).subscribe(data => {
          if (data.status === 200) {
            this.getEvents();
            this.toastr.success(data.message, 'Success!', { dismiss: 'controlled', showCloseButton: true, toastLife: 4000 });
          }
         });
      }
  });
  }
}
