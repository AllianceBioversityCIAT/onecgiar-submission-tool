import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { DevTagComponent } from './dev-tag.component';

const angularMaterialModules = [
  MatIconModule
]

@NgModule({
  declarations: [DevTagComponent],
  exports: [DevTagComponent],
  imports: [
    CommonModule,
    ...angularMaterialModules
  ]
})
export class DevTagModule { }
