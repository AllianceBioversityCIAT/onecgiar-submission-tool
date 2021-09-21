import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyComplianceAndOversightComponent } from './policy-compliance-and-oversight.component';

const routes: Routes = [
  {
    path:'',
    component: PolicyComplianceAndOversightComponent,
    children: [
      {
        path: 'open-and-fair-data-assets',
        loadChildren: () => import('./open-and-fair-data-assets/open-and-fair-data-assets.module').then(mod => mod.OpenAndFairDataAssetsModule),
      },
      {
        path: 'research-governance',
        loadChildren: () => import('./research-governance/research-governance.module').then(mod => mod.ResearchGovernanceModule),
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyComplianceAndOversightRoutingModule { }
