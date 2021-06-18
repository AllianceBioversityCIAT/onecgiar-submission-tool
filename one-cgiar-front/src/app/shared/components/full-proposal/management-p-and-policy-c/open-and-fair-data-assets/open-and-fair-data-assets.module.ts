import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenAndFAIRDataAssetsRoutingModule } from './open-and-fair-data-assets-routing.module';
import { OpenAndFAIRDataAssetsComponent } from '../open-and-fair-data-assets/open-and-fair-data-assets.component';


@NgModule({
  declarations: [OpenAndFAIRDataAssetsComponent],
  imports: [
    CommonModule,
    OpenAndFAIRDataAssetsRoutingModule
  ]
})
export class OpenAndFAIRDataAssetsModule { }
