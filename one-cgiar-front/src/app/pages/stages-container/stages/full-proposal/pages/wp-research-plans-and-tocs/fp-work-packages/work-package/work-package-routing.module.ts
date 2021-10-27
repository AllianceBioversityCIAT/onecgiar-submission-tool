import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkPackageComponent } from './work-package.component';

const routes: Routes = [
  {
    path:':wpID',
    component:WorkPackageComponent,
    children: [
      {
        path:'',
        redirectTo:'wp-general-info'
      },
      {
        path: 'wp-general-info',
        loadChildren: () => import('./wp-general-information/wp-general-information.module').then(mod => mod.WpGeneralInformationModule),
      },
      {
        path: 'wp-toc',
        loadChildren: () => import('./wp-toc/wp-toc.module').then(mod => mod.WpTocModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkPackageRoutingModule { }
