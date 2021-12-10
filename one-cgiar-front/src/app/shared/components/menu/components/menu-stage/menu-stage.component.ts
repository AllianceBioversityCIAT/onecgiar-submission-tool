import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-stage',
  templateUrl: './menu-stage.component.html',
  styleUrls: ['./menu-stage.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '0' })),
      transition('collapse => expand', animate('.3s ease-in')),
      transition('expand => collapse', animate('.3s ease-out')),
    ]),
  ],
})
export class MenuStageComponent implements OnInit {
  @Input() userMenu;
  constructor(
    private router : Router,
    public _menuService : MenuService
  ) { }

  ngOnInit(): void {
    console.log(this.userMenu)
  }



}
