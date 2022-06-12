import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnovationPackagesAndSrpRoutingModule } from './innovation-packages-and-srp-routing.module';
import { InnovationPackagesAndSrpComponent } from './innovation-packages-and-srp.component';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [InnovationPackagesAndSrpComponent],
  imports: [
    CommonModule,
    InnovationPackagesAndSrpRoutingModule,
    UtilsModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    InputNumberModule,
    InputTextModule
  ]
})
export class InnovationPackagesAndSrpModule { }
