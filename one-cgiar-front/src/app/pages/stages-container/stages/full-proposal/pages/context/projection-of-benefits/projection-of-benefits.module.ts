import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectionOfBenefitsRoutingModule } from './projection-of-benefits-routing.module';
import { ProjectionOfBenefitsComponent } from './projection-of-benefits.component';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [ProjectionOfBenefitsComponent],
  imports: [
    CommonModule,
    ProjectionOfBenefitsRoutingModule,
    UtilsModule,
    TableModule
  ]
})
export class ProjectionOfBenefitsModule { }
