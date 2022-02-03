import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitiativeCreatorComponent } from './initiative-creator.component';
import { AddButtonModule } from '../../../../../../shared/components/add-button/add-button.module';
import { DialogModule } from 'primeng/dialog';
import { GeneralInformationModule } from '../general-information/general-information.module';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [InitiativeCreatorComponent],
  exports: [InitiativeCreatorComponent],
  imports: [
    CommonModule,
    AddButtonModule,
    DialogModule,
    GeneralInformationModule,
    ButtonModule
  ]
})
export class InitiativeCreatorModule { }
