import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersManagementComponent } from './users-management.component';
import { UtilsModule } from '../../../../../shared/components/utils/utils.module';
import { CreateUserModule } from './pages/create-user/create-user.module';
import {DialogService} from 'primeng/dynamicdialog';
import { CreateUserService } from './service/create-user.service';



@NgModule({
  declarations: [UsersManagementComponent],
  exports: [UsersManagementComponent],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    TableModule,
    ProgressBarModule,
    ButtonModule,
    InputTextModule,
    UtilsModule,
    FormsModule,
    InputSwitchModule,
    CreateUserModule,
    ToastModule
  ],
  providers:[DialogService, CreateUserService]
})
export class UsersManagementModule { }
