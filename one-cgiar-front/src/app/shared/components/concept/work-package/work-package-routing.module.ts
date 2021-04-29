import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkPackageComponent } from './work-package.component';
import { GeneralInformationWorkPackageComponent } from './general-information-work-package/general-information-work-package.component';
import { GeographicScopeWorkPackageComponent } from './geographic-scope-work-package/geographic-scope-work-package.component';

const routes: Routes = [
  {
    path: ':id', 
    component:WorkPackageComponent, 
    children: [
      {
        path:'',
        redirectTo:'general-information',
        pathMatch: 'full'
      },
      {
        path: 'general-information',
        component: GeneralInformationWorkPackageComponent,
      },
      {
        path: 'geographic-scope',
        component: GeographicScopeWorkPackageComponent,
      },
      // {
      //   path: 'projection_of_benefits',
      //   component: NarrativesConceptComponent,
      // },
    ]
       
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkPackageRoutingModule { }
