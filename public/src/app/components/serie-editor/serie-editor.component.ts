import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Serie, SerieFactory } from '../../models/serie.model';
import { ClrModal } from '@clr/angular';

@Component({
  selector: 'app-serie-editor',
  templateUrl: './serie-editor.component.html',
  styleUrls: ['./serie-editor.component.css']
})
export class SerieEditorComponent implements OnInit {

  @Input('serie') serie: Serie = new Serie();
  @Output('saved') savedEvent: EventEmitter<Serie> = new EventEmitter<Serie>();

  @ViewChild('tmdbModal') tmdbModal: ClrModal;
  public imgUrl = 'https://image.tmdb.org/t/p/w500';
  public series: any[] = [];

  constructor(private serieFactory: SerieFactory) { }

  ngOnInit() {
  }

  search() {
    this.serieFactory.search(this.serie.folder.name).then((result) => {
      this.series = result.results;
      this.tmdbModal.open();
    }).catch((err) => {
      console.error(err);
    });
  }

  onSerieSelected(serie) {
    this.serie.folder.name = serie.name;
    this.serie.image = this.imgUrl + serie.poster_path;
    this.serie.description = serie.overview;
    this.serie.firstAirDate = serie.first_air_date;
    this.tmdbModal.close();
  }

  onSubmit() {
    this.serieFactory.createOrUpdate(this.serie).then((serie) => {
      this.savedEvent.emit(serie);
    }).catch((err) => {
      console.error(err);
    });
  }

}
