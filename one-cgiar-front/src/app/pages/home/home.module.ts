import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { InitTableComponent } from '@app/shared/components/init-table/init-table.component';


@NgModule({
  declarations: [HomeComponent, NavbarComponent, InitTableComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
