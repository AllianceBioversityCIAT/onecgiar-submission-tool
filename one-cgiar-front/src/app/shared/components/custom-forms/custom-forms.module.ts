import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea/textarea.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { NgxEditorModule } from 'ngx-editor';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';



@NgModule({
  declarations: [TextareaComponent, InputComponent, SelectComponent, MultipleChoiceComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule.forRoot({
      locals: {
        bold: 'Boldata',
      },
    })
  ],
  exports: [TextareaComponent, InputComponent, SelectComponent,MultipleChoiceComponent]
})
export class CustomFormsModule { }
