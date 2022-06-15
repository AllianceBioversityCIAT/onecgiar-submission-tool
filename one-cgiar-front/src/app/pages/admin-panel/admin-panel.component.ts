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
        label: 'User panel',
        icon: 'pi pi-fw pi-users',
        url: '/admin/users'
      },
      {
        label: 'Completeness status',
        icon: 'pi pi-fw pi-comment',
        items: [
          {
            label: 'ISDC comments',
            icon: 'pi pi-fw pi-bookmark',
            url: '/admin/isdc-status'
          },
          {
            label: 'ToC reporting',
            icon: 'pi pi-fw pi-bookmark',
            url: '/admin/toc-reporting'
          }
        ]
      }
    ]
  }


}
