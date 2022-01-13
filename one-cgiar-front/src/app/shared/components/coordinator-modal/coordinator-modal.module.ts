import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoordinatorModalComponent } from './coordinator-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [CoordinatorModalComponent],
  exports:[CoordinatorModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class CoordinatorModalModule { }
