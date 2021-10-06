import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesMenuRoutingModule } from './stages-menu-routing.module';
import { StagesMenuComponent } from './stages-menu.component';
import { MaterialModule } from '@app/material.module';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UtilsModule } from '../../shared/components/utils/utils.module';
import {ButtonModule} from 'primeng/button';
import { ManageAccessComponent } from './stages/shared/components/manage-access/manage-access.component';
import { EditRolUserComponent } from './stages/shared/components/edit-rol-user/edit-rol-user.component';
import { CreateUsersComponent } from './stages/shared/components/create-users/create-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';


@NgModule({
  declarations: [StagesMenuComponent,MenuComponent,ManageAccessComponent,EditRolUserComponent, CreateUsersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    StagesMenuRoutingModule,
    MaterialModule,
    UtilsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    IbdAngularComponentsModule
  ]
})
export class StagesMenuModule { }
