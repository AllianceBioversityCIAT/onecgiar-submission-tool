import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccessComponent } from './manage-access.component';
import { CreateUsersModule } from '../create-users/create-users.module';
import {MatTabsModule} from '@angular/material/tabs';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [ManageAccessComponent],
  exports: [ManageAccessComponent],
  imports: [
    CommonModule,
    CreateUsersModule,
    MatTabsModule,
    IbdAngularComponentsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ManageAccessModule { }
