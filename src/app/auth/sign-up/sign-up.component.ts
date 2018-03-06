import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: User;
  formGroup: FormGroup;
  constructor(
    public toastr: ToastsManager,
    private titleService: Title,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.titleService.setTitle('Sign Up | OfficeEatz');
    this.formGroup = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])
    });
  }
  onSubmit() {
    this.userService
      .createUser(this.formGroup.value)
      .subscribe(data => {
        if (data.status == 201) {
          this.toastr.success('Successfully registerd.', 'Success!', { dismiss: 'controlled', showCloseButton: true });
          this.router.navigate(['/auth/sign-in']);
        } else if (data.status == 200) {
          this.toastr.error('Email already exists.', 'Error!', { dismiss: 'controlled', showCloseButton: true });
        }
      });
  }
}
