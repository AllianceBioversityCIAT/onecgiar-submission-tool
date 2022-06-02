import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionOfInterestRoutingModule } from './section-of-interest-routing.module';
import { SectionOfInterestComponent } from './section-of-interest.component';


@NgModule({
  declarations: [SectionOfInterestComponent],
  imports: [
    CommonModule,
    SectionOfInterestRoutingModule
  ]
})
export class SectionOfInterestModule { }
