import { Component, OnInit, Input } from '@angular/core';
import { ManagerDetails } from '../../../models/manager';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() managerDetails: ManagerDetails;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
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
