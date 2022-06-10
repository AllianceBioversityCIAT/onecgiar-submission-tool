import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckHomeGuard } from './shared/guards/check-home.guard';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { IsAdminGuard } from './shared/guards/is-admin.guard';

const routes: Routes = [
  {
    path: 'initiatives/:id/stages/:stageName',
    loadChildren: () => import('./pages/stages-container/stages-menu.module').then((m) => m.StagesMenuModule),
  },  
  {
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
    canActivate: [CheckHomeGuard],
  },
  {
    path: 'bi',
    loadChildren: () => import('./pages/bi/bi.module').then((m) => m.BiModule),
  },  
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin-panel/admin-panel.module').then((m) => m.AdminPanelModule),
    canActivate: [IsAdminGuard],
  },  
  {
    path: 'notFound',
    loadChildren: () =>import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '', 
    loadChildren: () =>import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [CheckLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
