import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkPackageTOCRoutingModule } from './work-package-toc-routing.module';
import { WorkPackageTOCComponent } from '../work-package-toc/work-package-toc.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [WorkPackageTOCComponent],
  imports: [
    CommonModule,
    WorkPackageTOCRoutingModule,
    UtilsModule
  ]
})
export class WorkPackageTOCModule { }
