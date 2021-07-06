import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { NgxEditorModule } from 'ngx-editor';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { TextComponent } from './text/text.component';
import { RegionsFilterPipe } from '../../pipes/regions-filter.pipe';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { LinkListComponent } from './link-list/link-list.component';



@NgModule({
  declarations: [InputComponent, SelectComponent, MultipleChoiceComponent, TextComponent,RegionsFilterPipe, UploadFilesComponent, LinkListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  exports:      [ InputComponent, SelectComponent,MultipleChoiceComponent, TextComponent,UploadFilesComponent,LinkListComponent]
})
export class CustomFormsModule { }
