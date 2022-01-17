import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcKeyPartnersRoutingModule } from './pc-key-partners-routing.module';
import { PcKeyPartnersComponent } from './pc-key-partners.component';


@NgModule({
  declarations: [PcKeyPartnersComponent],
  imports: [
    CommonModule,
    PcKeyPartnersRoutingModule
  ]
})
export class PcKeyPartnersModule { }
