import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnovationPackagesAndSrpRoutingModule } from './innovation-packages-and-srp-routing.module';
import { InnovationPackagesAndSrpComponent } from './innovation-packages-and-srp.component';


@NgModule({
  declarations: [InnovationPackagesAndSrpComponent],
  imports: [
    CommonModule,
    InnovationPackagesAndSrpRoutingModule
  ]
})
export class InnovationPackagesAndSrpModule { }
