import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Genre, Movie } from '../model/movie.models';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';


@Injectable({
  providedIn: 'root'
})
export class MoviesStore {

  private subject = new BehaviorSubject<Movie[]>([]);
  private gSubject = new BehaviorSubject<Genre[]>([]);

  movies$: Observable<Movie[]> = this.subject.asObservable();
  genres$: Observable<Genre[]> = this.gSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService) {

    this.loadAllMovies();
    this.loadAllGenres();

  }

  private loadAllMovies() {

    // mocking data for dev ...
    // const loadMovies$ = this.http.get('/assets/movies.json')
    //   .pipe(
    //     map((response: any) => response["results"]),
    //     catchError((error: any) => {
    //       this.messages.showErrors(error);
    //       return of(error) //
    //     }),
    //     tap(movies => this.subject.next(movies)),
    //   );

    const loadMovies$ = this.http.get<Movie[]>('/api/movies-list')
      .pipe(
        map((response: any) => response["results"]),
        catchError(err => {
          const message = "Could not load movies";
          this.messages.showErrors(message);
          console.log(message, err);
          return of(err);
        }),
        tap(movies => this.subject.next(movies))
      );

    this.loading.showLoaderUntilCompleted(loadMovies$)
      .subscribe();

  }
  private loadAllGenres() {

    // mocking data for dev ...
    // const loadGenres$ = this.http.get('/assets/genres.json')
    //   .pipe(
    //     map((response: any) => response["genres"]),
    //     catchError((error: any) => {
    //       this.messages.showErrors(error);
    //       return of(error) //
    //     }),
    //     tap(genres => this.gSubject.next(genres)),
    //   );

    const loadGenres$ = this.http.get<Movie[]>('/api/genres-list')
      .pipe(
        map((response: any) => response["genres"]),
        catchError(err => {
          const message = "Could not load genres";
          this.messages.showErrors(message);
          console.log(message, err);
          return of(err);
        }),
        tap(genres => this.gSubject.next(genres))
      );

    this.loading.showLoaderUntilCompleted(loadGenres$)
      .subscribe();

  }

}
