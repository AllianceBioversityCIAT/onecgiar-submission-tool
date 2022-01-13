import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUsersComponent } from './create-users.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [CreateUsersComponent],
  exports: [CreateUsersComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatDividerModule
  ]
})
export class CreateUsersModule { }
