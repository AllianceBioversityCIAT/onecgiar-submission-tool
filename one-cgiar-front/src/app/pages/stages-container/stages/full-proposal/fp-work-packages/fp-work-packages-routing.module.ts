import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FpWorkPackagesComponent } from './fp-work-packages.component';

const routes: Routes = [
  {
    path: '',
    component: FpWorkPackagesComponent,
    children: [
      {
        path: 'general-information',
        loadChildren: () => import('../../../../../shared/components/full-proposal/fp-work-packages/fp-general-information/fp-general-information.module').then(mod => mod.FpGeneralInformationModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FpWorkPackagesRoutingModule { }
