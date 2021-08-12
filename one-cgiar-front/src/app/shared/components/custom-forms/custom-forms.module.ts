import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { RegionsFilterPipe } from '../../pipes/regions-filter.pipe';
import { SelectComponent } from './select/select.component';
@NgModule({
  declarations: [SelectComponent,MultipleChoiceComponent,RegionsFilterPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:      [SelectComponent, MultipleChoiceComponent]
})
export class CustomFormsModule { }
