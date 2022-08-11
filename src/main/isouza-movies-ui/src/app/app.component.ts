import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'isouza-movies-ui';

  constructor(public auth: AuthenticationService, private router: Router) {

  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
  }
}
