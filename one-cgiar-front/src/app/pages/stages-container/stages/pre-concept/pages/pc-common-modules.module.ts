import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { InitiativesService } from '../../../../../shared/services/initiatives.service';
import { AddButtonModule } from '../../../../../shared/components/add-button/add-button.module';
import { ButtonAddElementModule } from '../../shared/components/button-add-element/button-add-element.module';


let modules = [
  IbdAngularComponentsModule,
  AddButtonModule,
  ButtonAddElementModule
]
@NgModule({
  declarations: [],
  exports:[UtilsModule,...modules],
  imports: [CommonModule,...modules],
  providers:[ InitiativesService ]
})
export class PcCommonModulesModule { }
