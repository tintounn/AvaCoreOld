import { Component, AfterViewInit, Input } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  @Input('id') id: string = "map";
  private map: any = null;

  constructor() { }

  ngAfterViewInit() {
    let mapProps = {
      center: {lat: 41.85, lng: -87.65},
      zoom: 5,
    };

    this.map = new google.maps.Map(document.getElementById(this.id), mapProps);
  }
}
