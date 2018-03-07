import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private titleService: Title, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Manager Dashboard | Office Eats');
  }

  newEvent() {
    this.router.navigate(['/manager/events/new']);
  }
}
