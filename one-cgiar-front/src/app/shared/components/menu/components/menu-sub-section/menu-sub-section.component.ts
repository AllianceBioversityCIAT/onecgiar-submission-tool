import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-menu-sub-section',
  templateUrl: './menu-sub-section.component.html',
  styleUrls: ['./menu-sub-section.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '0' })),
      transition('collapse => expand', animate('.3s ease-in')),
      transition('expand => collapse', animate('.3s ease-out')),
    ]),
  ],
})
export class MenuSubSectionComponent implements OnInit {
  // @Input() section;
  // @Input() stage;
  constructor(
    public _menuService:MenuService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }

}
