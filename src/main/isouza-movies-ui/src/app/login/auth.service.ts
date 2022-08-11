import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: string | null;
  public password: string | null;

  constructor(private http: HttpClient) {

  }

  authenticationService(username: string, password: string): Observable<any> {
    return this.http.post<any>(`/api/login`, { email: username, password: password },
      {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
          // avoid browser popup
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {

    return this.http.post<any>(`/api/logout`,
      {
        headers: {
          // avoid browser popup
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).pipe(map((res) => {
        sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
        this.username = null;
        this.password = null;
      })).subscribe();

  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
