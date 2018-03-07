import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user: User;
  formGroup: FormGroup;
  constructor(private titleService: Title,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Forgot Password | Office Eats');
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
    });
  }
  onSubmit() {
    console.log(this.formGroup.value)
  }
}
