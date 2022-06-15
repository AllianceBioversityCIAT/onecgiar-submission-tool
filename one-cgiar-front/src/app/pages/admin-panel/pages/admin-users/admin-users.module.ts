import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersComponent } from './admin-users.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ToggleFormatDateModule } from '../../../../shared/components/toggle-format-date/toggle-format-date.module';
import { UtilsModule } from '../../../../shared/components/utils/utils.module';

@NgModule({
  declarations: [AdminUsersComponent],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToggleFormatDateModule,
    UtilsModule,
    DropdownModule,
    FormsModule
  ]
})
export class AdminUsersModule { }
