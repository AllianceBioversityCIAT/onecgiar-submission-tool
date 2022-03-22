import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { TawkToComponent } from '../tawk-to/tawk-to.component';

const angularMaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
]

@NgModule({
  declarations: [HeaderComponent,TawkToComponent],
  exports: [HeaderComponent],
  imports: [
    CommonModule,
    ...angularMaterialModules
  ]
})
export class HeaderModule { }
