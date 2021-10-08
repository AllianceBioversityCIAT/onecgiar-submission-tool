import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeliaRoutingModule } from './melia-routing.module';
import { MeliaComponent } from './melia.component';


@NgModule({
  declarations: [MeliaComponent],
  imports: [
    CommonModule,
    MeliaRoutingModule
  ]
})
export class MeliaModule { }
