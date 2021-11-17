import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpGeneralInformationRoutingModule } from './wp-general-information-routing.module';
import { WpGeneralInformationComponent } from './wp-general-information.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { UtilsModule } from '../../../../../../../../../shared/components/utils/utils.module';
import { SkeletonsModule } from '@app/shared/components/skeletons/skeletons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeographicScopeModule } from '../../../../../../shared/components/geographic-scope/geographic-scope.module';


@NgModule({
  declarations: [WpGeneralInformationComponent],
  imports: [
    CommonModule,
    WpGeneralInformationRoutingModule,
    IbdAngularComponentsModule,
    UtilsModule,
    SkeletonsModule,
    FormsModule,
    ReactiveFormsModule,
    GeographicScopeModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WpGeneralInformationModule { }
