import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutg',
  templateUrl: './aboutg.component.html',
  styleUrls: ['./aboutg.component.css']
})
export class AboutgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.documentElement.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
