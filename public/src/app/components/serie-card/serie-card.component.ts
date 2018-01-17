import { Component, OnInit, Input } from '@angular/core';
import { Serie } from '../../models/serie.model';

@Component({
  selector: 'app-serie-card',
  templateUrl: './serie-card.component.html',
  styleUrls: ['./serie-card.component.css']
})
export class SerieCardComponent implements OnInit {

  @Input('serie') serie: Serie;

  constructor() { }

  ngOnInit() {
  }

}
