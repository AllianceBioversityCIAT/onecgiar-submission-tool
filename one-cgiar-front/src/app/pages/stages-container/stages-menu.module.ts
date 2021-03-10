import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/modules/shared-module.module'
import { StagesMenuRoutingModule } from './stages-menu-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StagesMenuRoutingModule,
    // SharedModule
  ]
})
export class StagesMenuModule { }
