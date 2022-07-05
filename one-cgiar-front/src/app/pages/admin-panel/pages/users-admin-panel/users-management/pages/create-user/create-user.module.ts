import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateUserComponent} from './create-user.component'
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateUserComponent],
  exports: [CreateUserComponent],
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FormsModule
  ]
})
export class CreateUserModule { }
