import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullInitiativeTocRoutingModule } from './full-initiative-toc-routing.module';
import { FullInitiativeTocComponent } from './full-initiative-toc.component';
import { UtilsModule } from '../../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditTocButtonModule } from '../../../../../../../shared/components/edit-toc-button/edit-toc-button.module';


@NgModule({
  declarations: [FullInitiativeTocComponent],
  imports: [
    CommonModule,
    FullInitiativeTocRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    EditTocButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FullInitiativeTocModule { }
