import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Movie, MovieFactory } from '../../models/movie.model';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.css']
})
export class MovieEditorComponent implements OnInit {

  @Input('movie') movie: Movie = new Movie();
  @Output('saved') savedEvent: EventEmitter<Movie> = new EventEmitter<Movie>();

  @ViewChild('tmdbModal') tmdbModal: ClrModal;
  public imgUrl = 'https://image.tmdb.org/t/p/w500';
  public movies: any[] = [];

  constructor(private movieFactory: MovieFactory) { }

  ngOnInit() {
  }

  search() {
    this.movieFactory.search(this.movie.name).then((result) => {
      this.movies = result.results;
      this.tmdbModal.open();
    }).catch((err) => {
      console.error(err);
    });
  }

  onMovieSelected(movie) {
    this.movie.image = this.imgUrl + movie.poster_path;
    this.movie.description = movie.overview;
    this.movie.releaseDate = movie.release_date;
    this.tmdbModal.close();
  }

  onSubmit() {
    this.movieFactory.createOrUpdate(this.movie).then((movie) => {
      console.log(movie);
    }).catch((err) => {
      console.log(err);
    });
  }

}
