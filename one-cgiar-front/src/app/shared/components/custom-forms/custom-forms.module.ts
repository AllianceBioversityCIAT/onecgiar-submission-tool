import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MultipleChoiceComponent } from './multiple-choice/multiple-choice.component';
import { RegionsFilterPipe } from '../../pipes/regions-filter.pipe';
import { SelectComponent } from './select/select.component';
import { MaterialModule } from '../../../material.module';
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
