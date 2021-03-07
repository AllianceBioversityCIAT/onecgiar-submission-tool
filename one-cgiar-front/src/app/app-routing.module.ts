import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import { CheckHomeGuard } from '@shared/guards/check-home.guard';
import { StagesMenuComponent } from './pages/stages-container/stages-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
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
    path: 'initiatives', component: StagesMenuComponent, children: [
      {
        path: ':id/stages',
        loadChildren: () =>
          import('./pages/stages-container/stages-menu.module').then((m) => m.StagesMenuModule),
      },
      // {
      //   path: ':id/stages/general-information', component: GeneralInformationConceptComponent,
      // },
      // {
      //   path: ':id/stages/narratives', component: NarrativesConceptComponent,
      // },
      // {
      //   path: ':id/stages/theory-of-change', component: TheoryOfChangeComponent,
      // },
      // {
      //   path: 'work-packages-c', component: WorkPackagesComponent,
      // },
      // {
      //   path: ':idIni/stages/work-packages/:id', component: WorkPackagesComponent,
      // },
      // {
      //   path: ':id/stages/key-partners', component: KeyPartnersConceptComponent,
      // },
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
