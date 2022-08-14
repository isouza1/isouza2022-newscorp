import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { Movie } from '../model/movie.models';
import { Registration } from '../register/registration';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {
  }

  register(email: string, password: string): Observable<any> {
    // return this.http.post<any>(`/api/login`, { email: username, password: password },
    return this.http.post(`/api/register`, { email, password }, { headers: {  "Content-Type": "application/json"  } })
      .pipe(
        shareReplay(),
      );
  }

}







