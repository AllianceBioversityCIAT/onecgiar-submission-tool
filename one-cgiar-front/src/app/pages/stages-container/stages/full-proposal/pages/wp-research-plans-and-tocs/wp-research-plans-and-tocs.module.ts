import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpResearchPlansAndTocsRoutingModule } from './wp-research-plans-and-tocs-routing.module';
import { WpResearchPlansAndTocsComponent } from '../wp-research-plans-and-tocs/wp-research-plans-and-tocs.component';


@NgModule({
  declarations: [WpResearchPlansAndTocsComponent],
  imports: [
    CommonModule,
    WpResearchPlansAndTocsRoutingModule
  ]
})
export class WpResearchPlansAndTocsModule { }
