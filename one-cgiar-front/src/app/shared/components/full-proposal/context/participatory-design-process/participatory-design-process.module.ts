import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipatoryDesignProcessRoutingModule } from './participatory-design-process-routing.module';
import { ParticipatoryDesignProcessComponent } from './participatory-design-process.component';
import { UtilsModule } from '../../../utils/utils.module';
import { IbdAngularComponentsModule } from '../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ParticipatoryDesignProcessComponent],
  imports: [
    CommonModule,
    ParticipatoryDesignProcessRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParticipatoryDesignProcessModule { }
