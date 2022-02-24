import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeliaComponent } from './melia.component';

const routes: Routes = [
  {
    path:'',
    component: MeliaComponent,
    children: [
      {
        path: 'melia-plan',
        loadChildren: () => import('./melia-plan/melia-plan.module').then(mod => mod.MeliaPlanModule),
      },
      {
        path: 'result-framework',
        loadChildren: () => import('./result-framework/result-framework.module').then(mod => mod.ResultFrameworkModule),
      },
      {
        path: 'melia-studies-and-activities',
        loadChildren: () => import('./melia-studies-and-activities/melia-studies-and-activities.module').then(mod => mod.MeliaStudiesAndActivitiesModule),
      },
      {
        path: 'table-a',
        loadChildren: () => import('./table-a/table-a.module').then(mod => mod.TableAModule),
      },
      {
        path: 'table-b',
        loadChildren: () => import('./table-b/table-b.module').then(mod => mod.TableBModule),
      },
      {
        path: 'table-c',
        loadChildren: () => import('./table-c/table-c.module').then(mod => mod.TableCModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeliaRoutingModule { }
