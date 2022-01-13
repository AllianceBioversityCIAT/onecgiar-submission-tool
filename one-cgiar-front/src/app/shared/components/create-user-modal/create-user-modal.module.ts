import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserModalComponent } from './create-user-modal.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateUserModalComponent],
  exports: [
    CreateUserModalComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CreateUserModalModule { }
