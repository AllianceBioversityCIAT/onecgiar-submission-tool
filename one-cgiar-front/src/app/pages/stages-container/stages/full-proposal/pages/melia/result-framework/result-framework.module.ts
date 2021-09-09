import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultFrameworkRoutingModule } from './result-framework-routing.module';
import { ResultFrameworkComponent } from './result-framework.component';


@NgModule({
  declarations: [ResultFrameworkComponent],
  imports: [
    CommonModule,
    ResultFrameworkRoutingModule
  ]
})
export class ResultFrameworkModule { }
