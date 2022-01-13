import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesMenuRoutingModule } from './stages-menu-routing.module';
import { StagesMenuComponent } from './stages-menu.component';
import { UtilsModule } from '../../shared/components/utils/utils.module';
import {ButtonModule} from 'primeng/button';
import { ManageAccessComponent } from './stages/shared/components/manage-access/manage-access.component';
import { EditRolUserComponent } from './stages/shared/components/edit-rol-user/edit-rol-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { MenuModule } from '../../shared/components/menu/menu.module';
import { MaterialModule } from '../../material.module';
import { ManageAccessModule } from './stages/shared/components/manage-access/manage-access.module';
import { CreateUsersModule } from './stages/shared/components/create-users/create-users.module';

@NgModule({
  declarations: [StagesMenuComponent,EditRolUserComponent],
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
    MenuModule,
    ManageAccessModule,
    CreateUsersModule
  ]
})
export class StagesMenuModule { }
