import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcKeyPartnersRoutingModule } from './pc-key-partners-routing.module';
import { PcKeyPartnersComponent } from './pc-key-partners.component';
import { PcCommonModulesModule } from '../pc-common-modules.module';


@NgModule({
  declarations: [PcKeyPartnersComponent],
  imports: [
    CommonModule,
    PcKeyPartnersRoutingModule,
    PcCommonModulesModule
  ]
})
export class PcKeyPartnersModule { }
