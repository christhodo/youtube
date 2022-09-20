import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthGuardService, NotifyService } from '@project-angular/core-data';
import { Router } from '@angular/router';
import { User } from '@project-angular/api-interfaces';

@Component({
  selector: 'project-angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userInfo = { email: 'users@n.com', password: 'pass' };
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notify: NotifyService,
    private authGuardService: AuthGuardService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  login() {
    const inputedUser: User = this.form.value;
    if (this.form.invalid) {
      return false;
    } else {
      if (
        inputedUser.email === this.userInfo.email &&
        inputedUser.password === this.userInfo.password
      ) {
        this.authGuardService.setToken(inputedUser.email);
        this.router.navigate(['/projects']);
      }
    }
  }

  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }
}
