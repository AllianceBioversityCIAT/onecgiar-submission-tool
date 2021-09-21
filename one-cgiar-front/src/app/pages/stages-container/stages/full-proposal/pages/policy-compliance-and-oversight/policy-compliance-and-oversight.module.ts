import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyComplianceAndOversightRoutingModule } from './policy-compliance-and-oversight-routing.module';
import { PolicyComplianceAndOversightComponent } from './policy-compliance-and-oversight.component';


@NgModule({
  declarations: [PolicyComplianceAndOversightComponent],
  imports: [
    CommonModule,
    PolicyComplianceAndOversightRoutingModule
  ]
})
export class PolicyComplianceAndOversightModule { }
