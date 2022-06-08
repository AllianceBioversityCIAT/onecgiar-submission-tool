import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InitTableComponent } from '../../shared/components/init-table/init-table.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { InitiativeCreatorModule } from '../stages-container/stages/shared/components/initiative-creator/initiative-creator.module';


@NgModule({
  declarations: [HomeComponent,InitTableComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InitiativeCreatorModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule { }
