import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-color-picker-modal',
  templateUrl: './color-picker-modal.component.html',
  styleUrls: ['./color-picker-modal.component.css']
})
export class ColorPickerModalComponent implements OnInit {

  @Output('submitted') submitted: EventEmitter<string> = new EventEmitter<string>();
  @Input('color') color: string = "#000000";
  @Input('id') id: string = "";

  constructor() { }

  ngOnInit() {}

  submit() {
    this.submitted.emit(this.color);
  }

  onColorChanged(color: string) {
    this.color = color;
  }
}
