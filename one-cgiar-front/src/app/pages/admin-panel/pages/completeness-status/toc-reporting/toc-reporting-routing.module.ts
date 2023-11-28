import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TocReportingComponent } from './toc-reporting.component';

const routes: Routes = [{path:'',component: TocReportingComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TocReportingRoutingModule { }
