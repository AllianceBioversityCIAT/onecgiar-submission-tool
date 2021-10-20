import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FpWorkPackagesComponent } from './fp-work-packages.component';

const routes: Routes = [
  {
    path:'',
    component:FpWorkPackagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./wps-table/wps-table.module').then(mod => mod.WpsTableModule),
      },
      {
        path: 'work-package',
        loadChildren: () => import('./work-package/work-package.module').then(mod => mod.WorkPackageModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FpWorkPackagesRoutingModule { }
