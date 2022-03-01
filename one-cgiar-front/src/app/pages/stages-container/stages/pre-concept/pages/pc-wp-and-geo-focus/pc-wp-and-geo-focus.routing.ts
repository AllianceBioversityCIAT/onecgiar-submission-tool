import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PcWpAndGeoFocusComponent } from './pc-wp-and-geo-focus.component';

const routes: Routes = [
  {
    path:'',
    component: PcWpAndGeoFocusComponent,
    children: [
      {
        path: 'work-packages/work-package/:id',
        loadChildren: () => import('./pages/pc-work-package/pc-work-package.module').then(mod => mod.PcWorkPackageModule),
      },
      {
        path: 'work-packages-table',
        loadChildren: () => import('./pages/pc-wp-table/pc-wp-table.module').then(mod => mod.PcWpTableModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcWpAndGeoFocusRoutingModule { }
