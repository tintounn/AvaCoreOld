import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie, MovieFactory } from '../../models/movie.model';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.css']
})
export class MovieEditorComponent implements OnInit {

  @Input('movie') movie: Movie = new Movie();
  @Output('saved') savedEvent: EventEmitter<Movie> = new EventEmitter<Movie>();

  constructor(private movieFactory: MovieFactory) { }

  ngOnInit() {
  }

  onSubmit() {
    this.movieFactory.createOrUpdate(this.movie).then((movie) => {
      console.log(movie);
    }).catch((err) => {
      console.log(err);
    });
  }

}
