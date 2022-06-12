import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { TawkToModule } from '../tawk-to/tawk-to.module';

const angularMaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  TawkToModule
]

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    ...angularMaterialModules
  ]
})
export class HeaderModule { }
