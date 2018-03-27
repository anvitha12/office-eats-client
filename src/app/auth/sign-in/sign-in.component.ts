import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  returnUrl: string;
  signInForm: FormGroup;
  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private titleService: Title,
    public toastr: ToastsManager,
    private userService: UserService,
    private router: Router,
    private activedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.titleService.setTitle('Sign In | Office Eats');
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activedRoute.snapshot.queryParams['returnUrl'] || '/manager';

    this.signInForm = new FormGroup({
      email: new FormControl('', [
        Validators.email
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
      .authorize(this.signInForm.value)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (data.status === 201) {
          this.router.navigate([this.returnUrl]);
        } else if (data.status === 200) {
          this.toastr.error('Invalid email or password.', 'Error!', { dismiss: 'controlled', showCloseButton: true, toastLife: 4000 });
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
