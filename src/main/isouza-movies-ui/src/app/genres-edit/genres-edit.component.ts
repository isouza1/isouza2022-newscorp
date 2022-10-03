import { Component, OnInit } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { combineLatest, map, Observable, of, pipe } from 'rxjs';
import { TypedCheckbox } from '../common/typed-checkbox';
import { Genre } from '../model/movie.models';
import { MoviesStore } from '../services/movies.store';

export enum ResourceKlas {
  ENGLISH = 'English',
  MATHEMATICS = 'Mathematics',
  SCIENCE = 'Science',
  HSIE = 'HSIE',
  LANGUAGES = 'Languages',
  TAS = 'TAS',
  PDHPE = 'PDHPE',
  CREATIVE_ARTS = 'Creative arts',
}

@Component({
  selector: 'app-genres-edit',
  templateUrl: './genres-edit.component.html',
  styleUrls: ['./genres-edit.component.scss'],
})
export class GenresEditComponent implements OnInit {
  // public genresCheckboxes: Observable<Array<TypedCheckbox<any>>> = of([]);
  public genresCheckboxes: Array<TypedCheckbox<any>> = [];
  selectedGenres: Genre[] = [];

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  allGenres$: Observable<Genre[]> = this.moviesStore.genres$;

  constructor(private moviesStore: MoviesStore) {}

  ngOnInit(): void {
    this.allGenres$
      .pipe(
        map((genres: Genre[]) => {
          this.genresCheckboxes = genres.map((genreItem: Genre) => {
            return {
              type: genreItem,
              label: genreItem.name,
              value: genreItem.id + '',
              checked:
                this.selectedGenres &&
                this.selectedGenres.some((kla) => kla.id === genreItem.id),
            };
          });
        })
      )
      .subscribe();
  }

  updateGenresMaterialUI(cb: MatCheckbox, value: string) {
    const checkBox = <TypedCheckbox<any>>(
      this.genresCheckboxes.find((x) => x.value === value)
    );
    checkBox.checked = cb.checked;
    this.selectedGenres = this.getSelectedGenres();
  }

  updateGenres(cb: HTMLInputElement, value: string) {
    // const checkBox = this.genresCheckboxes.find((x) => x.value === value) || new TypedCheckbox<any>();
    // const checkBox = this.genresCheckboxes.find((x) => x.value === value) as TypedCheckbox<any>;
    const checkBox = <TypedCheckbox<any>>(
      this.genresCheckboxes.find((x) => x.value === value)
    );
    checkBox.checked = cb.checked;
    this.selectedGenres = this.getSelectedGenres();
  }

  getSelectedGenres(): Genre[] {
    return this.genresCheckboxes.filter((x) => x.checked).map((x) => x.type);
  }
}
