import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ClrModal } from '@clr/angular';
import { Router } from '@angular/router';
import { Serie } from '../../models/serie.model';

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

  onSerieClicked(serie: Serie) {
    this.router.navigate(['/serie', serie.id]);
  }

}
