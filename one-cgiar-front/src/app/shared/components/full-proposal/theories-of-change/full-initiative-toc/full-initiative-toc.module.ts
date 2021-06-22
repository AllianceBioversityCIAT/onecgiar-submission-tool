import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullInitiativeTOCRoutingModule } from './full-initiative-toc-routing.module';
import { FullInitiativeTOCComponent } from '../full-initiative-toc/full-initiative-toc.component';
import { UtilsModule } from '../../../utils/utils.module';


@NgModule({
  declarations: [FullInitiativeTOCComponent],
  imports: [
    CommonModule,
    FullInitiativeTOCRoutingModule,
    UtilsModule
  ]
})
export class FullInitiativeTOCModule { }
