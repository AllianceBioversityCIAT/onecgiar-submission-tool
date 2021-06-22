import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EthicsComponent } from '../../../../../shared/components/full-proposal/management-p-and-policy-c/ethics/ethics.component';
import { ManagementPAndPolicyCComponent } from './management-p-and-policy-c.component';

const routes: Routes = [
  {
    path:'',
    component:ManagementPAndPolicyCComponent,
    children: [
      {
        path: 'ethics',
        loadChildren: () => import('../../../../../shared/components/full-proposal/management-p-and-policy-c/ethics/ethics.module').then(mod => mod.EthicsModule),
      },
      {
        path: 'management-plan',
        loadChildren: () => import('../../../../../shared/components/full-proposal/management-p-and-policy-c/management-plan/management-plan.module').then(mod => mod.ManagementPlanModule),
      },
      {
        path: 'open-and-fair-data-assets',
        loadChildren: () => import('../../../../../shared/components/full-proposal/management-p-and-policy-c/open-and-fair-data-assets/open-and-fair-data-assets.module').then(mod => mod.OpenAndFAIRDataAssetsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementPAndPolicyCRoutingModule { }
