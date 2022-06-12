import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CgiarLogoSvgComponent } from './cgiar-logo-svg/cgiar-logo-svg.component';

const angularMaterialModules = [
  MatButtonModule,
  MatIconModule
]

@NgModule({
  declarations: [NavbarComponent, CgiarLogoSvgComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    ...angularMaterialModules
  ]
})
export class NavbarModule { }
