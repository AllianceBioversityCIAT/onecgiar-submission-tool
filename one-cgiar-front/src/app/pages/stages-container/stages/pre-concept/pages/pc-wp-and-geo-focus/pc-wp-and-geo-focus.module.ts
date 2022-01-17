import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcWpAndGeoFocusRoutingModule } from './pc-wp-and-geo-focus-routing.module';
import { PcWpAndGeoFocusComponent } from './pc-wp-and-geo-focus.component';
import { PcCommonModulesModule } from '../pc-common-modules.module';


@NgModule({
  declarations: [PcWpAndGeoFocusComponent],
  imports: [
    CommonModule,
    PcWpAndGeoFocusRoutingModule,
    PcCommonModulesModule
  ]
})
export class PcWpAndGeoFocusModule { }
