import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let speed:number = value;
    let unit:string = "o";
    
    if(value > 1073741824) {
      speed /= 1073741824;
      unit = "go";
    } else if(value > 1048576) {
      speed /= 1048576;
      unit = "mo";
    } else if(value > 1024) {
      speed /= 1024;
      unit = "ko";
    }
    
    return speed.toFixed(1) + " " + unit;
  }

}
