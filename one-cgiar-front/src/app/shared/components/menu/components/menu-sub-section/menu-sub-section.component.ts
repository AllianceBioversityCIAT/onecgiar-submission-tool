import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtilsService } from '../../../../services/utils.service';

@Component({
  selector: 'app-menu-sub-section',
  templateUrl: './menu-sub-section.component.html',
  styleUrls: ['./menu-sub-section.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '0' })),
      transition('collapse => expand', animate('.1s ease-in')),
      transition('expand => collapse', animate('.1s ease-out')),
    ]),
  ],
})
export class MenuSubSectionComponent implements OnInit {
  // @Input() section;
  // @Input() stage;
  @Input() customRouterLink:string = '';
  @Input() haveContent = false;
  @Input() collapse:boolean = true;
  @Input() fieldsCompleted:boolean = false;
  @Input() showTocIcon:boolean = false;
  @Input() type: "sub-section"|"reports" = "sub-section";
  @Input() noTitleDisplay: boolean = false;
  
  constructor(
    public _menuService:MenuService,
    public router:Router,
    public _utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    // this.collapse = !this._utilsService.validateCurrrentSection(this.customRouterLink);
    this.collapse = false;

  }

}
