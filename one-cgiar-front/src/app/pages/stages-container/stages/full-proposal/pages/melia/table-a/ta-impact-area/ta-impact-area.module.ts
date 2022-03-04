import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaImpactAreaRoutingModule } from './ta-impact-area-routing.module';
import { TaImpactAreaComponent } from './ta-impact-area.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { IaVisualReferenceModule } from '../../../../../../../../shared/components/ia-visual-reference/ia-visual-reference.module';


@NgModule({
  declarations: [TaImpactAreaComponent],
  imports: [
    CommonModule,
    TaImpactAreaRoutingModule,
    UtilsModule,
    IaVisualReferenceModule
  ]
})
export class TaImpactAreaModule { }
