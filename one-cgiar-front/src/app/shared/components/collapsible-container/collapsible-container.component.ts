import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-collapsible-container',
  templateUrl: './collapsible-container.component.html',
  styleUrls: ['./collapsible-container.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '0' })),
      transition('collapse => expand', animate('.3s cubic-bezier(0.455, 0.03, 0.515, 0.955)')),
      transition('expand => collapse', animate('.3s cubic-bezier(0.455, 0.03, 0.515, 0.955)')),
    ]),
  ],
})
export class CollapsibleContainerComponent implements OnInit {
  @Input() collapse:boolean = true;
  @Input() contentStyles = {};
  constructor() { }

  ngOnInit(): void {
    this.validateNullcollapse();
  }

  validateNullcollapse(){
    if (typeof this.collapse === "boolean") return;
    this.collapse = true;
  }

  toggleCollapse(){
    this.collapse = !this.collapse;
  }

}
