import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MatListModule } from '@angular/material/list';
import { ContactModalModule } from '../contact-modal/contact-modal.module';
import { RouterModule } from '@angular/router';

const angularMaterialModules = [
  MatListModule
]

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [
    CommonModule,
    ContactModalModule,
    RouterModule,
    ...angularMaterialModules
  ]
})
export class FooterModule { }
