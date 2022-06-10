import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersComponent } from './admin-users.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [AdminUsersComponent],
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ]
})
export class AdminUsersModule { }
