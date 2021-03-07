import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StagesGuard } from '@shared/guards/stages.guard';

const routes: Routes = [
  {
    path: 'concept',
    canActivate: [StagesGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./stages/concept/concept.module').then(mod => mod.ConceptModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StagesMenuRoutingModule { }
