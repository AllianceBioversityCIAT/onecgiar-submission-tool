import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HumanResourcesRoutingModule } from './human-resources-routing.module';
import { HumanResourcesComponent } from './human-resources.component';


@NgModule({
  declarations: [HumanResourcesComponent],
  imports: [
    CommonModule,
    HumanResourcesRoutingModule
  ]
})
export class HumanResourcesModule { }
