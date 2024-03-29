import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersRequestComponent } from './partners-request.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { NgxSpinnerModule } from 'ngx-spinner';
import {ButtonModule} from 'primeng/button';
import { UtilsModule } from '../utils/utils.module';



@NgModule({
  declarations: [PartnersRequestComponent],
  exports:[PartnersRequestComponent],
  imports: [
    CommonModule,
    IbdAngularComponentsModule,
    ButtonModule,
    UtilsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PartnersRequestModule { }
