import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInformationConceptComponent } from '@shared/components/concept/general-information-concept/general-information-concept.component';
import { NarrativesConceptComponent } from '../../../../shared/components/concept/narratives-concept/narratives-concept.component';
import { TheoryOfChangeComponent } from '../../../../shared/components/concept/theory-of-change/theory-of-change.component';
import { WorkPackagesComponent } from '../../../../shared/components/concept/work-packages/work-packages.component';
import { KeyPartnersComponent } from '../../../../shared/components/preconcept/key-partners/key-partners.component';
import { KeyPartnersConceptComponent } from '../../../../shared/components/concept/key-partners-concept/key-partners-concept.component';
import { ConceptComponent } from './concept.component';
import { UnderConstructionGuard } from '../../../../shared/guards/under-construction.guard';
import { UnderConstructionPageComponent } from '../../../../shared/components/utils/under-construction-page/under-construction-page.component';


const routes: Routes = [
  {
    path: '', 
    component:ConceptComponent, 
    children: [
      {
        path:'',
        redirectTo:'general-information',
        pathMatch: 'full'
      },
      {
        path: 'general-information',
        loadChildren: () => import('./general-info-concept/general-info-concept.module').then((m) => m.GeneralInfoConceptModule),
      },
      {
        path: 'narratives',
        component: NarrativesConceptComponent,
      },
      {
        path: 'initial-theory-of-change',
        component: TheoryOfChangeComponent,
      },
      {
        path: 'work-packages',
        component: WorkPackagesComponent,
        // canActivate: [UnderConstructionGuard], 
        // data: {section: 'work-packages'} 
      },
      {
        path: 'work-package',
        loadChildren: () => import('../../../../shared/components/concept/work-package/work-package.module').then((m) => m.WorkPackageModule),
        canActivate:[false]
        // canActivate: [UnderConstructionGuard], 
        // data: {section: 'work-packages'}    import { WorkPackageComponent } from '../../../../shared/components/concept/work-package/work-package.component';
      },
      {
        path: 'key-partners',
        component: KeyPartnersConceptComponent,
        // canActivate: [UnderConstructionGuard], 
        // data: {section: 'key-partners'} 
      },
      {
        path: 'under-construction-page',
        component: UnderConstructionPageComponent,
      },
    ]
       
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptRoutingModule { }
