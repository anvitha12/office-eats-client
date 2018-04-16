import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss']
})
export class AttendeeComponent implements OnInit {
  returnUrl: string;
  constructor(private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activedRoute.snapshot.queryParams);
  }

}
