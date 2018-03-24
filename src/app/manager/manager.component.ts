import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from './manager.service';
import { ManagerDetails } from './models/manager';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  managerDetails: ManagerDetails = <ManagerDetails>{};
  isSidebarOpen: boolean;

  constructor(private userService: UserService,
    private managerService: ManagerService,
    private router: Router) {
    router.events.subscribe((val) => {
      this.isSidebarOpen = false;
    });
  }

  ngOnInit() {
    this.isSidebarOpen = false;
    this.managerDetails = this.managerService._getManagerDetails();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  signOut() {
    this.userService
      .signout()
      .subscribe((data) => {
        if (data.status === 201) {
          window.location.href = '/auth/sign-in';
        }
      });
  }
}
