import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-more-container',
  templateUrl: './read-more-container.component.html',
  styleUrls: ['./read-more-container.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '150px' })),
      transition('collapse => expand', animate('.3s cubic-bezier(0.455, 0.03, 0.515, 0.955)')),
      transition('expand => collapse', animate('.3s cubic-bezier(0.455, 0.03, 0.515, 0.955)')),
    ]),
  ],
})
export class ReadMoreContainerComponent implements OnInit {
  collapse:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.collapse = !this.collapse;
  }



}
