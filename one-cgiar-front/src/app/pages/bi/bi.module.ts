import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiRoutingModule } from './bi-routing.module';
import { BiComponent } from './bi.component';
import { FooterModule } from '@app/shared/components/footer/footer.module';

@NgModule({
  declarations: [BiComponent],
  exports: [BiComponent],
  imports: [CommonModule, BiRoutingModule, FooterModule],
})
export class BiModule {}
