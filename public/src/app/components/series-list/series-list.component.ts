import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ClrModal } from '@clr/angular';
import { Serie, SerieFactory } from '../../models/serie.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  @ViewChild("serieEditorModal") serieEditorModal: ClrModal;
  @Output('serieClicked') serieClickedEvent: EventEmitter<Serie> = new EventEmitter<Serie>();
  public series: Serie[] = [];

  constructor( private serieFactory: SerieFactory) { }

  ngOnInit() {
    this.refreshList("");
  }

  refreshList(value: string) {
    this.serieFactory.findAll(value).then((series) => {
      this.series = series;
    }).catch((err) => {
      console.error(err);
    });
  }

  onSearch(value: string) {
    this.refreshList(value);
  }

  onSerieClicked(serie: Serie) {
    this.serieClickedEvent.emit(serie);
  }

  openSerieWizard() {
    this.serieEditorModal.open();
  }

  onSerieSaved(serie: Serie) {
    this.serieEditorModal.close();
  }
}
