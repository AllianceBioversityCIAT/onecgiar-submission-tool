import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalPartnersRequestComponent } from './global-partners-request.component';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';



@NgModule({
  declarations: [GlobalPartnersRequestComponent],
  exports: [GlobalPartnersRequestComponent],
  imports: [
    CommonModule,
    UtilsModule,
    IbdAngularComponentsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GlobalPartnersRequestModule { }
