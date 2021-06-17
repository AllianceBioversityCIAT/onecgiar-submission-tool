import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipatoryDesignProcessRoutingModule } from './participatory-design-process-routing.module';
import { ParticipatoryDesignProcessComponent } from './participatory-design-process.component';


@NgModule({
  declarations: [ParticipatoryDesignProcessComponent],
  imports: [
    CommonModule,
    ParticipatoryDesignProcessRoutingModule
  ]
})
export class ParticipatoryDesignProcessModule { }
