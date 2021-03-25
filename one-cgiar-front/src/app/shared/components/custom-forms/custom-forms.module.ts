import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea/textarea.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TextareaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TextareaComponent]
})
export class CustomFormsModule { }
