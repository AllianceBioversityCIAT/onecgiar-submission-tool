import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import { CheckHomeGuard } from '@shared/guards/check-home.guard';
import { CreateInitiativeComponent } from './pages/create-initiative/create-initiative.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GeneralInformationComponent } from './shared/components/general-information/general-information.component';
import { NarrativesComponent } from './shared/components/narratives/narratives.component';
import { GeographicScopeComponent } from './shared/components/geographic-scope/geographic-scope.component';
import { KeyPartnersComponent } from './shared/components/key-partners/key-partners.component';
import { FeedbackComponent } from './shared/components/feedback/feedback.component';

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
export class AppRoutingModule {}
