import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInformationConceptComponent } from '@shared/components/concept/general-information-concept/general-information-concept.component';

const routes: Routes = [
  {
    path: '',  
    children: [
      {
        path: 'general-information',
        component: GeneralInformationConceptComponent,
      },
    ]
       
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptRoutingModule { }
