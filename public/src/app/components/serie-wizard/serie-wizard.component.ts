import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { Serie } from '../../models/serie.model';

@Component({
  selector: 'app-serie-wizard',
  templateUrl: './serie-wizard.component.html',
  styleUrls: ['./serie-wizard.component.css']
})
export class SerieWizardComponent implements OnInit {

  @ViewChild("wizard") wizard: ClrWizard;
  @Input("serie") serie: Serie = new Serie();

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.wizard.open();
  }

}
