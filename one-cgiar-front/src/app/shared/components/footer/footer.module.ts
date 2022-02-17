import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MatListModule } from '@angular/material/list';

const angularMaterialModules = [
  MatListModule
]

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [
    CommonModule,
    ...angularMaterialModules
  ]
})
export class FooterModule { }
