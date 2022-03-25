import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-collapsible-container',
  templateUrl: './collapsible-container.component.html',
  styleUrls: ['./collapsible-container.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '0' })),
      transition('collapse => expand', animate('.3s cubic-bezier(0.075, 0.82, 0.165, 1)')),
      transition('expand => collapse', animate('.3s cubic-bezier(0.075, 0.82, 0.165, 1)')),
    ]),
  ],
})
export class CollapsibleContainerComponent implements OnInit {
  collapse = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse(){
    this.collapse = !this.collapse;
  }

}
