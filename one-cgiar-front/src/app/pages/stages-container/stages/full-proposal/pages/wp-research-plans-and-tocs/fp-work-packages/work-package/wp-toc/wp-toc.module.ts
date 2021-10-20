import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpTocRoutingModule } from './wp-toc-routing.module';
import { WpTocComponent } from './wp-toc.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { SkeletonsModule } from '@app/shared/components/skeletons/skeletons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [WpTocComponent],
  imports: [
    CommonModule,
    WpTocRoutingModule,
    IbdAngularComponentsModule,
    SkeletonsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WpTocModule { }
