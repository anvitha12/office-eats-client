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
    this.managerService.getManagerDetails().subscribe((data) => {
      if (data.status === 200) {
        this.managerDetails = data.user_details;
        if (this.managerDetails.corporate_id) {
          this.managerService.setManagerCorporateId(this.managerDetails.corporate_id.toString());
        }
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  signOut() {
    this.userService
      .signout()
      .subscribe((data) => {
        if (data.status === 201) {
          this.router.navigate(['/auth/sign-in']);
        }
      });
  }
}
