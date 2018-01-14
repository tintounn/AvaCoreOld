import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie, MovieFactory } from '../../models/movie.model';
import { ClrModal } from '@clr/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  public movies: Movie[] = [];

  constructor(private movieFactory: MovieFactory, private router: Router) { }

  ngOnInit() {
    this.movieFactory.findAll().then((movies) => {
      this.movies = movies;
    }).catch((err) => {
      console.error(err);
    });
  }

  onMovieClicked(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }

}
