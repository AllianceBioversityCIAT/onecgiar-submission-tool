import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnersRequestComponent } from './partners-request.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { NgxSpinnerModule } from 'ngx-spinner';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [PartnersRequestComponent],
  exports:[PartnersRequestComponent],
  imports: [
    CommonModule,
    IbdAngularComponentsModule,
    ButtonModule
  ]
})
export class PartnersRequestModule { }
