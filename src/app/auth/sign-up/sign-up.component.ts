import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  constructor(private titleService: Title,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Sign Up | CMS');
    this.formGroup = new FormGroup({
      user_role_type: new FormControl('manager'),
      firstname: new FormControl('', [
        Validators.required
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      phone: new FormControl('', [
        Validators.required
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
    .createUser(this.formGroup.value)
    .subscribe(() => {
     
    });
  }
}
