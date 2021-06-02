import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContextRoutingModule } from './context-routing.module';
import { ContextComponent } from './context.component';


@NgModule({
  declarations: [ContextComponent],
  imports: [
    CommonModule,
    ContextRoutingModule
  ]
})
export class ContextModule { }
