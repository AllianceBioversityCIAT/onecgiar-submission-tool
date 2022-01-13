import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitTableComponent } from './init-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [InitTableComponent],
  exports:[InitTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule
  ]
})
export class InitTableModule { }
