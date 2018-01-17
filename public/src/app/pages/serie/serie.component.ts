import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerieFactory, Serie } from '../../models/serie.model';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  public serie: Serie;

  constructor(private route: ActivatedRoute, private serieFactory: SerieFactory) { }

  ngOnInit() {
    this.serieFactory.find(this.route.snapshot.params['id']).then((serie) => {
      this.serie = serie;
    }).catch((err) => {
      console.error(err);
    });
  }

}
