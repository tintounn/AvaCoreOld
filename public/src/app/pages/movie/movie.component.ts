import { Component, OnInit } from '@angular/core';
import { MovieFactory, Movie } from '../../models/movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movie: Movie = null;

  constructor(private movieFactory: MovieFactory, private route: ActivatedRoute) { }

  ngOnInit() {
    this.movieFactory.find(this.route.snapshot.params['id']).then((movie) => {
      this.movie = movie;
    }).catch((err) => {
      console.error(err);
    });
  }

}
