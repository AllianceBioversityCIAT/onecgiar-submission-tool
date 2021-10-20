import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WpTocRoutingModule } from './wp-toc-routing.module';
import { WpTocComponent } from './wp-toc.component';


@NgModule({
  declarations: [WpTocComponent],
  imports: [
    CommonModule,
    WpTocRoutingModule
  ]
})
export class WpTocModule { }
