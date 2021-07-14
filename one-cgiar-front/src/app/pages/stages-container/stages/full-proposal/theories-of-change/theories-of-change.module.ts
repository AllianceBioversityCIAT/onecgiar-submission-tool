import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheoriesOfChangeRoutingModule } from './theories-of-change-routing.module';
import { TheoriesOfChangeComponent } from './theories-of-change.component';


@NgModule({
  declarations: [TheoriesOfChangeComponent],
  imports: [
    CommonModule,
    TheoriesOfChangeRoutingModule
  ]
})
export class TheoriesOfChangeModule { }
