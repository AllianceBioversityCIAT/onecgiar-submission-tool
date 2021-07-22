import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralInformationComponent } from './general-information.component';


@NgModule({
  declarations: [GeneralInformationComponent],
  imports: [
    CommonModule,
  ],
  exports:[GeneralInformationComponent]

})
export class GeneralInformationModule { }
