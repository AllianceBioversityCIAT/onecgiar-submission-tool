import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: 'users-reporting', 
        loadChildren: () => import('./pages/admin-users/admin-users.module').then((m) => m.AdminUsersModule),
      },
      {
        path: 'isdc-status', 
        loadChildren: () => import('./pages/completeness-status/isdc-status/isdc-status.module').then((m) => m.IsdcStatusModule),
      },
      {
        path: 'toc-reporting', 
        loadChildren: () => import('./pages/completeness-status/toc-reporting/toc-reporting.module').then((m) => m.TocReportingModule),
      },
      {
        path: 'users-management', 
        loadChildren: () => import('./pages/users-admin-panel/users-management/users-management.module').then((m) => m.UsersManagementModule),
      },
      { path: '**', pathMatch: 'full', redirectTo: 'users-reporting' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
