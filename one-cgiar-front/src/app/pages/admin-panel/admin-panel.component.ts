import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { InitiativesService } from '../../shared/services/initiatives.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private _initiativesService:InitiativesService
  ) { }

  items: MenuItem[];

  ngOnInit(): void {
    this._initiativesService.initiative.id = null;
    this._initiativesService.initiative.stageId = null;
    this._initiativesService.initiative.stageName = null;
    this._initiativesService.initiative.exactStageName = null;
    this.items = [
      {
        label: 'Completeness status',
        icon: 'pi pi-fw pi-comment',
        expanded: true,
        items: [
          {
            label: 'ISDC comments reporting',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: '/admin/isdc-status'
          },
          {
            label: 'ToC reporting',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: '/admin/toc-reporting'
          }
        ]
      },
      {
        label: 'Users management',
        icon: 'pi pi-fw pi-users',
        expanded: true,
        items:[
          {
            label: 'User reporting',
            icon: 'pi pi-fw pi-bookmark',
            routerLink: '/admin/users-reporting'
          },
          {
            label: 'User management',
            icon: 'pi pi-fw pi-users',
            routerLink: '/admin/users-management'
          },
        ]
      }
    ]
  }

  activeMenu(event) {
    let node;
    if(event.target.parentNode.tagName != 'DIV' && !(event.target.parentNode.classList.contains('p-panelmenu-header-link') || event.target.parentNode.classList.contains('p-panelmenu-header'))){
      let headerNode = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
      if (event.target.tagName === "A") {
        node = event.target;
        headerNode = headerNode.firstChild.firstChild;
      } else {
        headerNode = headerNode.parentNode.firstChild.firstChild;
        node = event.target.parentNode;
      }
      const itemActive = document.querySelectorAll('.active-b, .active-h')
      for (let i = 0; i < itemActive.length; i++) {
        itemActive[i].classList.remove("active-b","active-h");
      }
      node.classList.add("active-b");
      headerNode.classList.add("active-h");
    }
  }


}
