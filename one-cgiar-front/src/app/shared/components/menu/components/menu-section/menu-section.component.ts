import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtilsService } from '../../../../services/utils.service';
import { DataControlService } from '../../../../services/data-control.service';

@Component({
  selector: 'app-menu-section',
  templateUrl: './menu-section.component.html',
  styleUrls: ['./menu-section.component.scss'],
  animations: [
    trigger('expandable', [
      state('expand', style({ height: '*' })),
      state('collapse', style({ height: '0' })),
      transition('collapse => expand', animate('.1s ease-in')),
      transition('expand => collapse', animate('.1s ease-out')),
    ]),
  ],
})
export class MenuSectionComponent implements OnInit {
  @Input() customRouterLink:string = '';
  @Input() haveContent = false;
  @Input() collapse:boolean = true;
  @Input() fieldsCompleted:boolean = false;
  @Input() sectionId: number = null;
  constructor(
    public router: Router,
    public _utilsService:UtilsService,
    public _dataControlService: DataControlService
  ) { }

  ngOnInit(): void {
    this.collapse = !this._utilsService.validateCurrrentSection(this.customRouterLink);
  }



 
  
}
