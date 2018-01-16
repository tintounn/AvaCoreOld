import { Component, OnInit, ViewChild } from '@angular/core';
import { SerieWizardComponent } from '../serie-wizard/serie-wizard.component';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  @ViewChild("serieWizard") serieWizard: SerieWizardComponent;

  constructor() { }

  ngOnInit() {
  }

  openSerieWizard() {
    this.serieWizard.open();
  }
}
