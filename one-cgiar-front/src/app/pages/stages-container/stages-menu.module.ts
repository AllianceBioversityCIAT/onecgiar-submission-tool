import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesMenuRoutingModule } from './stages-menu-routing.module';
import { StagesMenuComponent } from './stages-menu.component';
import { MaterialModule } from '@app/material.module';
import { UtilsModule } from '../../shared/components/utils/utils.module';
import {ButtonModule} from 'primeng/button';
import { ManageAccessComponent } from './stages/shared/components/manage-access/manage-access.component';
import { EditRolUserComponent } from './stages/shared/components/edit-rol-user/edit-rol-user.component';
import { CreateUsersComponent } from './stages/shared/components/create-users/create-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { MenuModule } from '../../shared/components/menu/menu.module';

@NgModule({
  declarations: [StagesMenuComponent,ManageAccessComponent,EditRolUserComponent, CreateUsersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    StagesMenuRoutingModule,
    MaterialModule,
    UtilsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    IbdAngularComponentsModule,
    MenuModule
  ]
})
export class StagesMenuModule { }
