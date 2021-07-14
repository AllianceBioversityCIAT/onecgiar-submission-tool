import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FpWorkPackagesRoutingModule } from './fp-work-packages-routing.module';
import { FpWorkPackagesComponent } from './fp-work-packages.component';


@NgModule({
  declarations: [FpWorkPackagesComponent],
  imports: [
    CommonModule,
    FpWorkPackagesRoutingModule
  ]
})
export class FpWorkPackagesModule { }
