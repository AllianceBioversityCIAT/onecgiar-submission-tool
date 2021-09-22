import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenAndFairDataAssetsRoutingModule } from './open-and-fair-data-assets-routing.module';
import { OpenAndFairDataAssetsComponent } from './open-and-fair-data-assets.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { CheckboxModule } from 'primeng/checkbox';
import { IbdAngularComponentsModule } from 'ibd-angular-components';


@NgModule({
  declarations: [OpenAndFairDataAssetsComponent],
  imports: [
    CommonModule,
    OpenAndFairDataAssetsRoutingModule,
    UtilsModule,
    CheckboxModule,
    IbdAngularComponentsModule
  ]
})
export class OpenAndFairDataAssetsModule { }
