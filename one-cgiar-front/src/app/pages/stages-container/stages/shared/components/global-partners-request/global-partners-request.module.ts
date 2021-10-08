import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalPartnersRequestComponent } from './global-partners-request.component';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { DialogModule } from 'primeng/dialog';
import { PartnersRequestModule } from '../../../../../../shared/components/partners-request/partners-request.module';



@NgModule({
  declarations: [GlobalPartnersRequestComponent],
  exports: [GlobalPartnersRequestComponent],
  imports: [
    CommonModule,
    UtilsModule,
    IbdAngularComponentsModule,
    DialogModule,
    PartnersRequestModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GlobalPartnersRequestModule { }
