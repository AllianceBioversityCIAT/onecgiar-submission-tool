import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

import { IsdcStatusRoutingModule } from './isdc-status-routing.module';
import { IsdcStatusComponent } from './isdc-status.component';


@NgModule({
  declarations: [IsdcStatusComponent],
  exports: [IsdcStatusComponent],
  imports: [
    CommonModule,
    IsdcStatusRoutingModule,
    TableModule,
    ProgressBarModule,
    ButtonModule,
    InputTextModule
  ],
})
export class IsdcStatusModule { }
