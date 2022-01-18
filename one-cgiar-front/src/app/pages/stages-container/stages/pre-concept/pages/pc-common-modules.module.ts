import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { InitiativesService } from '../../../../../shared/services/initiatives.service';



@NgModule({
  declarations: [],
  exports:[UtilsModule,IbdAngularComponentsModule],
  imports: [
    CommonModule,
    IbdAngularComponentsModule
  ],
  providers:[ InitiativesService ]
})
export class PcCommonModulesModule { }
