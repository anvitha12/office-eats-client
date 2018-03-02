import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User;
  formGroup: FormGroup;
  constructor(private titleService: Title,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Sign In | CMS');
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
    // this.userService
    //   .authorize(this.formGroup.value)
    //   .subscribe(() => {

    //   });
  }
}
