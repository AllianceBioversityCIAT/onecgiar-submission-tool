import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactStatementsRoutingModule } from './impact-statements-routing.module';
import { ImpactStatementsComponent } from './impact-statements.component';


@NgModule({
  declarations: [ImpactStatementsComponent],
  imports: [
    CommonModule,
    ImpactStatementsRoutingModule
  ]
})
export class ImpactStatementsModule { }
