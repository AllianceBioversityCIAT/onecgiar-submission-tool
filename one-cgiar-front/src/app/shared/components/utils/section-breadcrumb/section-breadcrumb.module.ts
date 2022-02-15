import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionBreadcrumbComponent } from './section-breadcrumb.component';
import { RouterModule } from '@angular/router';
import { PcWorkPackageRoutingModule } from '../../../../pages/stages-container/stages/pre-concept/pages/pc-wp-and-geo-focus/pages/pc-work-package/pc-work-package-routing.module';



@NgModule({
  declarations: [SectionBreadcrumbComponent],
  exports:[SectionBreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SectionBreadcrumbModule { }
