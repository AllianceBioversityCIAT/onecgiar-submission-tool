import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenAndFairDataAssetsRoutingModule } from './open-and-fair-data-assets-routing.module';
import { OpenAndFairDataAssetsComponent } from './open-and-fair-data-assets.component';


@NgModule({
  declarations: [OpenAndFairDataAssetsComponent],
  imports: [
    CommonModule,
    OpenAndFairDataAssetsRoutingModule
  ]
})
export class OpenAndFairDataAssetsModule { }
