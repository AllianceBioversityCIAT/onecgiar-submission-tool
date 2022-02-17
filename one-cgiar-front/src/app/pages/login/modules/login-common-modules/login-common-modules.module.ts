import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

let modulesToExport = [
  CommonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule
]

@NgModule({
  declarations: [],
  exports: [
    ...modulesToExport
  ],
  imports: [
    ...modulesToExport
  ]
})
export class LoginCommonModulesModule { }
