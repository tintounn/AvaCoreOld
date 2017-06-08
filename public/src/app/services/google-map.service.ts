import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class GoogleMapService {

  private elementRef: ElementRef;

  constructor() { }

  init(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  inject(key: String, cb: any) {
    let elt = document.createElement("script");
    elt.type = "text/javascript";
    elt.onload = cb;
    elt.async = true;
    elt.defer = true;
    elt.src = "https://maps.googleapis.com/maps/api/js?key=" + key;
    this.elementRef.nativeElement.appendChild(elt);
  }
}
