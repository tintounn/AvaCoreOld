import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';

declare var Typewriter: any;

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css']
})
export class TypewriterComponent implements AfterViewInit {

  @Input("id") id: string = "typewriter-container";
  @Input("class") class: string = "";
  @Input("string") string: string = "";
  @Input("typingSpeed") typingSpeed: number = null;

  private typewriter: any = null;

  constructor() { }

  ngAfterViewInit() {
    let element = document.getElementById(this.id);
    
    this.typewriter = new Typewriter(element, {
    });
    this.typewriter.typeString(this.string).start();
  }

}
