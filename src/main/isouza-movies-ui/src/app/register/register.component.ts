import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { MoviesService } from '../services/movies.service'
import { Registration } from './registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  registration: Registration;

  constructor(private fb: FormBuilder,
    private router: Router,
    private loadingService: LoadingService,
    private messages: MessagesService,
    private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fname: [''],
      lname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
      Validators.pattern(/([^a-zA-Z\d])+([a-zA-Z\d])+|([a-zA-Z\d])+([^a-zA-Z\d])+/)
      ]]
    });

  }

  register() {
    this.loadingService.loadingOn();
    this.moviesService.register(<Registration>this.form.value)
      .subscribe({
        complete: () => this.handleSuccess(),
        error: (err: any) => {
          this.messages.showErrors(err.error);
          this.loadingService.loadingOff();
        }
      });
  }

  handleSuccess(): void {
    // TODO ...
    // this.messages.showSuccess('Successfully registered');
    this.loadingService.loadingOff();
    this.router.navigateByUrl("/login");
  }

}
