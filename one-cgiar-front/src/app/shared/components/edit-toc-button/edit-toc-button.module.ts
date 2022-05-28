import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTocButtonComponent } from './edit-toc-button.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';



@NgModule({
  declarations: [EditTocButtonComponent],
  exports: [EditTocButtonComponent],
  imports: [
    CommonModule,
    IbdAngularComponentsModule
  ]
})
export class EditTocButtonModule { }
