import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Router } from '@angular/router';
import { take } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messages: MessagesService,
    private loadingService: LoadingService,
    private authService: AuthenticationService) {

    this.form = fb.group({
      email: ['', [Validators.required,]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  login() {
    const val = this.form.value;

    this.loadingService.loadingOn();
    this.authService.authenticationService(val.email, val.password)
      .pipe(take(1))
      .subscribe({
        complete: () => {
          this.router.navigateByUrl("/home")
          this.loadingService.loadingOff();
        },
        error: (err) => this.handleLoginError(err)
      });
  }

  handleLoginError(err: HttpErrorResponse) {
    this.loadingService.loadingOff();
    if (err.status !== 401)
      this.messages.showErrors(`${err.status} : ${err.statusText} `)
    else
      this.messages.showErrors(`Invalid username or password : ${err.status}`)
  }

}
