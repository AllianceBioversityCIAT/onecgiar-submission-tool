import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoFProposalRoutingModule } from './general-info-f-proposal-routing.module';
import { GeneralInfoFProposalComponent } from './general-info-f-proposal.component';
import { GeneralInformationModule } from '../../../shared/components/general-information/general-information.module';


@NgModule({
  declarations: [GeneralInfoFProposalComponent],
  imports: [
    CommonModule,
    GeneralInfoFProposalRoutingModule,
    GeneralInformationModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralInfoFProposalModule { }
