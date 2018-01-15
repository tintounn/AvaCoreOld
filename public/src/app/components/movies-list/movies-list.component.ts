import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Movie, MovieFactory } from '../../models/movie.model';
import { ClrModal } from '@clr/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  @ViewChild('movieEditorModal') roomEditorModal: ClrModal;
  @Output('movieClicked') movieClickedEvent: EventEmitter<Movie> = new EventEmitter<Movie>();
  public movies: Movie[] = [];

  constructor(private movieFactory: MovieFactory) { }

  ngOnInit() {
    this.refreshlist("");
  }

  refreshlist(searchValue: string) {
    this.movieFactory.findAll(searchValue).then((movies) => {
      this.movies = movies;
    }).catch((err) => {
      console.error(err);
    });
  }

  onSearch(value: string) {
    this.refreshlist(value);
  }

  onMovieClicked(movie: Movie) {
    this.movieClickedEvent.emit(movie);
  }

  onMovieSaved(movie: Movie) {
    this.roomEditorModal.close();
  }

  openMovieEditorModal() {
    this.roomEditorModal.open();
  }

}
