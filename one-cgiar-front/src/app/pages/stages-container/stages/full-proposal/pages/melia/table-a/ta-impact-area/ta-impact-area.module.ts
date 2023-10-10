import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaImpactAreaRoutingModule } from './ta-impact-area-routing.module';
import { TaImpactAreaComponent } from './ta-impact-area.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { IaVisualReferenceModule } from '../../../../../../../../shared/components/ia-visual-reference/ia-visual-reference.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from './../../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module'
import { EditTocButtonModule } from '../../../../../../../../shared/components/edit-toc-button/edit-toc-button.module';
import { EoiCardModule } from '../../../context/measurable-objectives/components/eoi-card/eoi-card.module';
import { ToggleFormatDateModule } from '../../../../../../../../shared/components/toggle-format-date/toggle-format-date.module';

@NgModule({
  declarations: [TaImpactAreaComponent],
  imports: [
    CommonModule,
    TaImpactAreaRoutingModule,
    UtilsModule,
    IaVisualReferenceModule,
    IbdAngularComponentsModule,
    EditTocButtonModule,
    EoiCardModule,
    ToggleFormatDateModule
  ]
})
export class TaImpactAreaModule { }
