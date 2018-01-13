import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie, MovieFactory } from '../../models/movie.model';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  public movies: Movie[] = [];
  public movie: Movie = new Movie();
  @ViewChild("videoPlayerModal") videoPlayerModal : ClrModal;

  constructor(private movieFactory: MovieFactory) { }

  ngOnInit() {
    this.movieFactory.findAll().then((movies) => {
      this.movies = movies;
    }).catch((err) => {
      console.error(err);
    });
  }

  onMovieSelected(movie: Movie) {
    this.movie = movie;
    this.videoPlayerModal.open();
  }

}
