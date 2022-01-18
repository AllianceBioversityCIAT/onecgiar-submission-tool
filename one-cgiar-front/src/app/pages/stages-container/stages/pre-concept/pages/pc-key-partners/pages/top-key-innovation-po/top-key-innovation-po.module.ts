import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopKeyInnovationPoRoutingModule } from './top-key-innovation-po-routing.module';
import { TopKeyInnovationPoComponent } from './top-key-innovation-po.component';


@NgModule({
  declarations: [TopKeyInnovationPoComponent],
  imports: [
    CommonModule,
    TopKeyInnovationPoRoutingModule
  ]
})
export class TopKeyInnovationPoModule { }
