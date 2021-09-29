import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullInitiativeTocRoutingModule } from './full-initiative-toc-routing.module';
import { FullInitiativeTocComponent } from './full-initiative-toc.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';


@NgModule({
  declarations: [FullInitiativeTocComponent],
  imports: [
    CommonModule,
    FullInitiativeTocRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FullInitiativeTocModule { }
