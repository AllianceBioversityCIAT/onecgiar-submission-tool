import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnovationPAndProjectionOfBRoutingModule } from './innovation-p-and-projection-of-b-routing.module';
import { InnovationPAndProjectionOfBComponent } from './innovation-p-and-projection-of-b.component';


@NgModule({
  declarations: [InnovationPAndProjectionOfBComponent],
  imports: [
    CommonModule,
    InnovationPAndProjectionOfBRoutingModule
  ]
})
export class InnovationPAndProjectionOfBModule { }
