import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User;
  formGroup: FormGroup;
  constructor(
    private titleService: Title,
    public toastr: ToastsManager,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.titleService.setTitle('Sign In | OfficeEatz');
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    this.userService
      .authorize(this.formGroup.value)
      .subscribe((data) => {
        if (data.status == 201) {
          this.router.navigate(['/manager']);
        } else if (data.status == 200) {
          this.toastr.error('Invalid email or password.', 'Error!', { dismiss: 'controlled', showCloseButton: true, toastLife: 4000 });
        }
      });
  }
}
