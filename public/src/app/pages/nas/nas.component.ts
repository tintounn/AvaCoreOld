import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'app-nas',
  templateUrl: './nas.component.html',
  styleUrls: ['./nas.component.css']
})
export class NasComponent implements OnInit {

  @ViewChild('movieEditorModal') roomEditorModal: ClrModal;

  constructor() { }

  ngOnInit() {
  }

  onMovieSaved(movie: Movie) {
    this.roomEditorModal.close();
  }

  openMovieEditorModal() {
    this.roomEditorModal.open();
  }

}
