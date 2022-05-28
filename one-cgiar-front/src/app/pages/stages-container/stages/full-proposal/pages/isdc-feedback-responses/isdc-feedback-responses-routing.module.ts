import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsdcFeedbackResponsesComponent } from './isdc-feedback-responses.component';

const routes: Routes = [
  {
    path:'',
    component:IsdcFeedbackResponsesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsdcFeedbackResponsesRoutingModule { }
