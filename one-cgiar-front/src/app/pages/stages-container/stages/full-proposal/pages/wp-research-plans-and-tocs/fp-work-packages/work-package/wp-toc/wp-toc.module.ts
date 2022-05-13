import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpTocRoutingModule } from './wp-toc-routing.module';
import { WpTocComponent } from './wp-toc.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { UtilsModule } from '../../../../../../../../../shared/components/utils/utils.module';
import { SkeletonsModule } from '../../../../../../../../../shared/components/skeletons/skeletons.module';
import { EditTocButtonModule } from '../../../../../../../../../shared/components/edit-toc-button/edit-toc-button.module';


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
    UtilsModule,
    EditTocButtonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WpTocModule { }
