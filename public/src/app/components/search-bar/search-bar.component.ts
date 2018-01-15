import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public value: string = "";
  private timeoutId: any;
  @Input('timeout') timeout: number = 200;
  @Output('valued') valuedEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onValueChange(str: string) {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.valuedEvent.emit(this.value);
    }, this.timeout);
  }

}
