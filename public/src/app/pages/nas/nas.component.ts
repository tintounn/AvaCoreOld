import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ClrModal } from '@clr/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nas',
  templateUrl: './nas.component.html',
  styleUrls: ['./nas.component.css']
})
export class NasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onMovieClicked(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }

}
