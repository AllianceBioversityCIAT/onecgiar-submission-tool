import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';



@NgModule({
  declarations: [],
  exports:[UtilsModule,IbdAngularComponentsModule],
  imports: [
    CommonModule,
    IbdAngularComponentsModule
  ]
})
export class PcCommonModulesModule { }
