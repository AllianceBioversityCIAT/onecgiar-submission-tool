import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: 'users', 
        loadChildren: () => import('./pages/admin-users/admin-users.module').then((m) => m.AdminUsersModule),
      },
      {
        path: 'isdc-status', 
        loadChildren: () => import('./pages/completeness-status/isdc-status/isdc-status.module').then((m) => m.IsdcStatusModule),
      },
      { path: '**', pathMatch: 'full', redirectTo: 'users' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
