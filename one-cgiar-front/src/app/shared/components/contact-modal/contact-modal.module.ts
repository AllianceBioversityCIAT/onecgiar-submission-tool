import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactModalComponent } from './contact-modal.component';



@NgModule({
  declarations: [ContactModalComponent],
  exports: [ContactModalComponent],
  imports: [
    CommonModule
  ]
})
export class ContactModalModule { }
