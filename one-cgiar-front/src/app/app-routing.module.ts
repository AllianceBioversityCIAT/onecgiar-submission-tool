import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CheckHomeGuard } from './shared/guards/check-home.guard';
import { CheckLoginGuard } from './shared/guards/check-login.guard';

const routes: Routes = [
  {
    path: 'initiatives/:id/stages',
    loadChildren: () => import('./pages/stages-container/stages-menu.module').then((m) => m.StagesMenuModule),
  },  
  {
    path: 'home', component: HomeComponent,
    canActivate: [CheckHomeGuard],
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
