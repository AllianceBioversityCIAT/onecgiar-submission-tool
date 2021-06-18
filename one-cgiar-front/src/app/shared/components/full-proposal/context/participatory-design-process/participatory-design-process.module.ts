import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipatoryDesignProcessRoutingModule } from './participatory-design-process-routing.module';
import { ParticipatoryDesignProcessComponent } from './participatory-design-process.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [ParticipatoryDesignProcessComponent],
  imports: [
    CommonModule,
    ParticipatoryDesignProcessRoutingModule,
    UtilsModule
  ]
})
export class ParticipatoryDesignProcessModule { }
