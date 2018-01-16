import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Serie, SerieFactory } from '../../models/serie.model';

@Component({
  selector: 'app-serie-editor',
  templateUrl: './serie-editor.component.html',
  styleUrls: ['./serie-editor.component.css']
})
export class SerieEditorComponent implements OnInit {

  @Input('serie') serie: Serie = new Serie();
  @Output('saved') savedEvent: EventEmitter<Serie> = new EventEmitter<Serie>();

  constructor(private serieFactory: SerieFactory) { }

  ngOnInit() {
  }

}
