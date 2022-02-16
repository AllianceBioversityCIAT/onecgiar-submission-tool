import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipatoryDesignProcessRoutingModule } from './participatory-design-process-routing.module';
import { ParticipatoryDesignProcessComponent } from './participatory-design-process.component';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [ParticipatoryDesignProcessComponent],
  imports: [
    CommonModule,
    ParticipatoryDesignProcessRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParticipatoryDesignProcessModule { }
