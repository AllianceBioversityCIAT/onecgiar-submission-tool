import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearningFpeAndIaRoutingModule } from './learning-fpe-and-ia-routing.module';
import { LearningFpeAndIaComponent } from './learning-fpe-and-ia.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [LearningFpeAndIaComponent],
  imports: [
    CommonModule,
    LearningFpeAndIaRoutingModule,
    UtilsModule
  ]
})
export class LearningFpeAndIaModule { }
