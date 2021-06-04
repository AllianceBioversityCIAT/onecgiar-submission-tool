import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallengeStatementRoutingModule } from './challenge-statement-routing.module';
import { ChallengeStatementComponent } from './challenge-statement.component';


@NgModule({
  declarations: [ChallengeStatementComponent],
  imports: [
    CommonModule,
    ChallengeStatementRoutingModule
  ]
})
export class ChallengeStatementModule { }
