import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInformationComponent } from './general-information.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomFormsModule } from '../custom-forms/custom-forms.module';
import { MaterialModule } from '../../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GeneralInformationComponent],
  imports: [
    CommonModule,
    IbdAngularComponentsModule,
    NgxSpinnerModule,
    CustomFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[GeneralInformationComponent]

})
export class GeneralInformationModule { }
