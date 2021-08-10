import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeographicScopeComponent } from './geographic-scope.component';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from '../custom-forms/custom-forms.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';



@NgModule({
  declarations: [GeographicScopeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    IbdAngularComponentsModule,
  ],
  exports: [GeographicScopeComponent],
})
export class GeographicScopeModule { }
