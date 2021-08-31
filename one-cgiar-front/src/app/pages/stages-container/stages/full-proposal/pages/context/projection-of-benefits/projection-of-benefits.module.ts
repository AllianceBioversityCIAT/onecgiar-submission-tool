import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectionOfBenefitsRoutingModule } from './projection-of-benefits-routing.module';
import { ProjectionOfBenefitsComponent } from './projection-of-benefits.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';


@NgModule({
  declarations: [ProjectionOfBenefitsComponent],
  imports: [
    CommonModule,
    ProjectionOfBenefitsRoutingModule,
    UtilsModule
  ]
})
export class ProjectionOfBenefitsModule { }
