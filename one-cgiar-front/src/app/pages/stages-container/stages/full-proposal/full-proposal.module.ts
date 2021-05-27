import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullProposalRoutingModule } from './full-proposal-routing.module';
import { FullProposalComponent } from './full-proposal.component';


@NgModule({
  declarations: [FullProposalComponent],
  imports: [
    CommonModule,
    FullProposalRoutingModule
  ]
})
export class FullProposalModule { }
