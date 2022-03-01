import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcWpAndGeoFocusRoutingModule } from './pc-wp-and-geo-focus.routing';
import { PcWpAndGeoFocusComponent } from './pc-wp-and-geo-focus.component';


@NgModule({
  declarations: [PcWpAndGeoFocusComponent],
  imports: [
    CommonModule,
    PcWpAndGeoFocusRoutingModule
  ]
})
export class PcWpAndGeoFocusModule { }
