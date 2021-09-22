import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResearchGovernanceRoutingModule } from './research-governance-routing.module';
import { ResearchGovernanceComponent } from './research-governance.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { CheckboxModule } from 'primeng/checkbox';
import { IbdAngularComponentsModule } from 'ibd-angular-components';

@NgModule({
  declarations: [ResearchGovernanceComponent],
  imports: [
    CommonModule,
    ResearchGovernanceRoutingModule,
    UtilsModule,
    CheckboxModule,
    IbdAngularComponentsModule
  ]
})
export class ResearchGovernanceModule { }
