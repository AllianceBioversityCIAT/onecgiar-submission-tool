import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpTocRoutingModule } from './wp-toc-routing.module';
import { WpTocComponent } from './wp-toc.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { UtilsModule } from '../../../../../../../../../shared/components/utils/utils.module';
import { SkeletonsModule } from '../../../../../../../../../shared/components/skeletons/skeletons.module';


@NgModule({
  declarations: [WpTocComponent],
  imports: [
    CommonModule,
    WpTocRoutingModule,
    IbdAngularComponentsModule,
    SkeletonsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    UtilsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WpTocModule { }
