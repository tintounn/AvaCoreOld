import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  @Output('colorChanged') colorChanged: EventEmitter<string> = new EventEmitter<string>();
  @Input('color') color: string = "#000000";
  public rgbColor: any = {r: 0, g: 0, b: 0};

  constructor() {
    this.rgbColor = this.toRgb();
  }

  onColorChange(event) {
    this.color = this.toHex();
    this.colorChanged.emit(this.color);
  }

  ngOnInit() {}

  toHex() {
    return "#" + ((1 << 24) + (this.rgbColor.r << 16) + (this.rgbColor.g << 8) + this.rgbColor.b).toString(16).slice(1);
  }

  toRgb() {
    let hex = this.color;
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
  }
}
