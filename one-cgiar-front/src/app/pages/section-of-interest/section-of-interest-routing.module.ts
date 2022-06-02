import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionOfInterestComponent } from './section-of-interest.component';

const routes: Routes = [{path:'', component : SectionOfInterestComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionOfInterestRoutingModule { }
