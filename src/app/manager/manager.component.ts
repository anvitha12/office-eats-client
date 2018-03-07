import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.userService
      .signout()
      .subscribe((data) => {
        if (data.status == 201) {
          this.router.navigate(['/auth/sign-in']);
        }
      });
  }
}
