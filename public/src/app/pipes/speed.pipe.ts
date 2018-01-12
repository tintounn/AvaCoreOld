import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let speed:number = value;
    let unit:string = "o/s";
    
    if(value > 1073741824) {
      speed /= 1073741824;
      unit = "go/s";
    } else if(value > 1048576) {
      speed /= 1048576;
      unit = "mo/s";
    } else if(value > 1024) {
      speed /= 1024;
      unit = "ko/s";
    }
    
    return speed.toFixed(1) + " " + unit;
  }

}
