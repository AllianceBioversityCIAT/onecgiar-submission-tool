import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpResearchPlansAndTocsRoutingModule } from './wp-research-plans-and-tocs-routing.module';
import { WpResearchPlansAndTocsComponent } from '../wp-research-plans-and-tocs/wp-research-plans-and-tocs.component';
import { UtilsModule } from '../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [WpResearchPlansAndTocsComponent],
  imports: [
    CommonModule,
    WpResearchPlansAndTocsRoutingModule,
    UtilsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WpResearchPlansAndTocsModule { }
