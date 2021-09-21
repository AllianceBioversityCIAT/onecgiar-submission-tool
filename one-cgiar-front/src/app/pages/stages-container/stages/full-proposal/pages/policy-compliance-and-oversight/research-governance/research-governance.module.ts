import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResearchGovernanceRoutingModule } from './research-governance-routing.module';
import { ResearchGovernanceComponent } from './research-governance.component';


@NgModule({
  declarations: [ResearchGovernanceComponent],
  imports: [
    CommonModule,
    ResearchGovernanceRoutingModule
  ]
})
export class ResearchGovernanceModule { }
