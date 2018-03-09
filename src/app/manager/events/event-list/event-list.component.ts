import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  constructor(private titleService: Title,  private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Events | Office Eats');
  }

  newEvent() {
    this.router.navigate(['/manager/events/new']);
  }
}
