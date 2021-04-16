import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StagesGuard } from '@shared/guards/stages.guard';
import { StagesMenuComponent } from './stages-menu.component';

const routes: Routes = [
  {
    path:'',
    component: StagesMenuComponent,
      children: [
        {
          path: 'concept',
          loadChildren: () => import('./stages/concept/concept.module').then(mod => mod.ConceptModule),
        },
      ],
    // path: 'concept',
    // canActivate: [StagesGuard],
    // children: [
    //   {
    //     path: '',
    //     loadChildren: () => import('./stages/concept/concept.module').then(mod => mod.ConceptModule),
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StagesMenuRoutingModule { }
