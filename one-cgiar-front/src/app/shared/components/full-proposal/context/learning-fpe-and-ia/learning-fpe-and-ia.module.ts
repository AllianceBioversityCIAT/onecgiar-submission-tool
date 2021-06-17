import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningFpeAndIaRoutingModule } from './learning-fpe-and-ia-routing.module';
import { LearningFpeAndIaComponent } from './learning-fpe-and-ia.component';


@NgModule({
  declarations: [LearningFpeAndIaComponent],
  imports: [
    CommonModule,
    LearningFpeAndIaRoutingModule
  ]
})
export class LearningFpeAndIaModule { }
