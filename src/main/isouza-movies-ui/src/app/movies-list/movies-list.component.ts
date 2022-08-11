import { Component, Input, OnInit } from '@angular/core';
import { Genre, Movie } from '../model/movie.models';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor() { }

  @Input()
  movies: Movie[] = [];

  @Input()
  allGenres: Genre[] = [];

  page = 1;

  ngOnInit(): void {
  }

  getGenre(genre_ids: number[]) : string {
    let result: string = '';
    // const genreList = this.allGenres.filter(genre => genre_ids.includes(genre.id));
    this.allGenres.forEach((genre : Genre) => {
      if (genre_ids.includes(genre.id)) {
        result += genre.name + " ";
      }
    });
    return result;
  }
}
