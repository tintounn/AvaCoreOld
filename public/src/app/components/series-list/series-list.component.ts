import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrModal } from '@clr/angular';
import { Serie } from '../../models/serie.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  @ViewChild("serieEditorModal") serieEditorModal: ClrModal;

  constructor() { }

  ngOnInit() {
  }

  openSerieWizard() {
    this.serieEditorModal.open();
  }

  onSerieSaved(serie: Serie) {
    this.serieEditorModal.close();
  }
}
