import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import { CheckHomeGuard } from '@shared/guards/check-home.guard';
import { CreateInitiativeComponent } from './pages/create-initiative/create-initiative.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GeneralInformationComponent } from './shared/components/preconcept/general-information/general-information.component';
import { NarrativesComponent } from './shared/components/preconcept/narratives/narratives.component';
import { GeographicScopeComponent } from './shared/components/preconcept/geographic-scope/geographic-scope.component';
import { KeyPartnersComponent } from './shared/components/preconcept/key-partners/key-partners.component';
import { FeedbackComponent } from './shared/components/preconcept/feedback/feedback.component';
import { NarrativesConceptComponent } from './shared/components/concept/narratives-concept/narratives-concept.component';
import { GeneralInformationConceptComponent } from './shared/components/concept/general-information-concept/general-information-concept.component';
import { TheoryOfChangeComponent } from './shared/components/concept/theory-of-change/theory-of-change.component';
import { WorkPackagesComponent } from './shared/components/concept/work-packages/work-packages.component';
import { KeyPartnersConceptComponent } from './shared/components/concept/key-partners-concept/key-partners-concept.component';

const routes: Routes = [
  {
    path: 'create-initiative', component: CreateInitiativeComponent, children: [
      {
        path: 'general-information-pc', component: GeneralInformationComponent,
      },
      {
        path: 'narratives-pc', component: NarrativesComponent,
      },
      {
        path: 'geographic-scope-pc', component: GeographicScopeComponent,
      },
      {
        path: 'key-partners-pc', component: KeyPartnersComponent,
      },
      {
        path: 'feedback-pc', component: FeedbackComponent,
      },
      {
        path: 'general-information-c/:id', component: GeneralInformationConceptComponent,
      },
      {
        path: 'narratives-c/:id', component: NarrativesConceptComponent,
      },
      {
        path: 'theory-of-change-c', component: TheoryOfChangeComponent,
      },
      {
        path: 'work-packages-c', component: WorkPackagesComponent,
      },
      {
        path: 'work-packages-c/:id', component: WorkPackagesComponent,
      },
      {
        path: 'key-partners-c', component: KeyPartnersConceptComponent,
      },
    ]
  },
  {
    path: 'home', component: HomeComponent,
    canActivate: [CheckHomeGuard],
  },
  {
    path: 'notFound', component: NotFoundComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '', component: LoginComponent,
    canActivate: [CheckLoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
