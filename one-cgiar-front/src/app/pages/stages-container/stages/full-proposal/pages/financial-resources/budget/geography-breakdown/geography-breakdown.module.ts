import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeographyBreakdownRoutingModule } from './geography-breakdown-routing.module';
import { GeographyBreakdownComponent } from './geography-breakdown.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '@app/shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';


@NgModule({
  declarations: [GeographyBreakdownComponent],
  imports: [
    CommonModule,
    GeographyBreakdownRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class GeographyBreakdownModule { }
