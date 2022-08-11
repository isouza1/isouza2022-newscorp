import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Genre, Movie } from '../model/movie.models';
import { BehaviorSubject, combineLatest, map, Observable, of, Subject } from 'rxjs';
import { MoviesStore } from '../services/movies.store';
import { AuthenticationService } from '../login/auth.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  private genreSelectedSubject = new BehaviorSubject<number[]>([]);
  genreSelectedAction$ = this.genreSelectedSubject.asObservable();

  // movies$!: Observable<Movie[]>;
  user: string | null;

  constructor(private moviesStore: MoviesStore) {
    this.user = sessionStorage.getItem('authenticatedUser');
  }

  ngOnInit() {
  }

  movies$ = this.moviesStore.movies$;
  private allGenres$ = this.moviesStore.genres$;

  vm$ = combineLatest([
    this.movies$,
    this.allGenres$
  ])
    .pipe(
      map(([movies, allGenres]) =>
        ({ movies, allGenres }))
      // map(([movies, categories]) => {
      //   movies.forEach((m) => {
      //     m.genderName = getGenres(m.genre_ids)
      //   })
      //   return ({ movies, categories })
      // })
    );



}


