import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  constructor() { }

  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'User reporting',
        icon: 'pi pi-fw pi-users',
        routerLink: '/admin/users'
      },
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
      }
    ]
  }


}
