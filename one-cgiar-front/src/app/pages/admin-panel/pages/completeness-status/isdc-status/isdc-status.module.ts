import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

import { IsdcStatusRoutingModule } from './isdc-status-routing.module';
import { IsdcStatusComponent } from './isdc-status.component';
import { UtilsModule } from '../../../../../shared/components/utils/utils.module';


@NgModule({
  declarations: [IsdcStatusComponent],
  exports: [IsdcStatusComponent],
  imports: [
    CommonModule,
    IsdcStatusRoutingModule,
    TableModule,
    ProgressBarModule,
    ButtonModule,
    InputTextModule,
    UtilsModule
  ],
  providers:[DatePipe]
})
export class IsdcStatusModule { }
