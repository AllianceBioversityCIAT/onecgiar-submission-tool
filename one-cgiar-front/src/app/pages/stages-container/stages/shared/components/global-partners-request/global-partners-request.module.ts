import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalPartnersRequestComponent } from './global-partners-request.component';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';



@NgModule({
  declarations: [GlobalPartnersRequestComponent],
  exports: [GlobalPartnersRequestComponent],
  imports: [
    CommonModule,
    UtilsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GlobalPartnersRequestModule { }
