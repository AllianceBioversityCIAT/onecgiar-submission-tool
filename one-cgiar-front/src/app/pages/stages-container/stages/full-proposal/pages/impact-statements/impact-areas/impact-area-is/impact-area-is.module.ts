import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactAreaIsRoutingModule } from './impact-area-is-routing.module';
import { ImpactAreaIsComponent } from './impact-area-is.component';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from '../../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
// import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalPartnersRequestModule } from '../../../../../shared/components/global-partners-request/global-partners-request.module';


@NgModule({
  declarations: [ImpactAreaIsComponent],
  imports: [
    CommonModule,
    ImpactAreaIsRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    GlobalPartnersRequestModule
  ]
})
export class ImpactAreaIsModule { }
