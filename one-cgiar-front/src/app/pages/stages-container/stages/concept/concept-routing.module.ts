import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInformationConceptComponent } from '@shared/components/concept/general-information-concept/general-information-concept.component';
import { NarrativesConceptComponent } from '../../../../shared/components/concept/narratives-concept/narratives-concept.component';
import { TheoryOfChangeComponent } from '../../../../shared/components/concept/theory-of-change/theory-of-change.component';
import { WorkPackagesComponent } from '../../../../shared/components/concept/work-packages/work-packages.component';
import { KeyPartnersComponent } from '../../../../shared/components/preconcept/key-partners/key-partners.component';
import { KeyPartnersConceptComponent } from '../../../../shared/components/concept/key-partners-concept/key-partners-concept.component';
import { ConceptComponent } from './concept.component';

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
        component: GeneralInformationConceptComponent,
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
      },
      {
        path: 'key-partners',
        component: KeyPartnersConceptComponent,
      },
    ]
       
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptRoutingModule { }
