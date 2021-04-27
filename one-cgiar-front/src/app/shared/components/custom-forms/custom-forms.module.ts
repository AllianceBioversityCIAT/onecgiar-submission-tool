import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextareaComponent } from './textarea/textarea.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { NgxEditorModule } from 'ngx-editor';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { TextComponent } from './text/text.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { RegionsFilterPipe } from '../../pipes/regions-filter.pipe';



@NgModule({
  declarations: [TextareaComponent, InputComponent, SelectComponent, MultipleChoiceComponent, TextComponent, SaveButtonComponent,RegionsFilterPipe],
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
  exports: [TextareaComponent, InputComponent, SelectComponent,MultipleChoiceComponent, TextComponent, SaveButtonComponent]
})
export class CustomFormsModule { }
