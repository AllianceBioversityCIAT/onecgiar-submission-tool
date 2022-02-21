import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagesMenuRoutingModule } from './stages-menu-routing.module';
import { StagesMenuComponent } from './stages-menu.component';
import { UtilsModule } from '../../shared/components/utils/utils.module';
import { ButtonModule } from 'primeng/button';
import { ManageAccessComponent } from './stages/shared/components/manage-access/manage-access.component';
import { EditRolUserComponent } from './stages/shared/components/edit-rol-user/edit-rol-user.component';
import { CreateUsersComponent } from './stages/shared/components/create-users/create-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { MenuModule } from '../../shared/components/menu/menu.module';
import { TooltipModule } from 'primeng/tooltip';
import { SectionBreadcrumbModule } from '../../shared/components/utils/section-breadcrumb/section-breadcrumb.module';
import { MaterialModule } from '../../material.module';
import { MaUserCardComponent } from './stages/shared/components/manage-access/components/ma-user-card/ma-user-card.component';
import { MaUserCardListComponent } from './stages/shared/components/manage-access/components/ma-user-card-list/ma-user-card-list.component';
import { ButtonEditOrDeleteModule } from './stages/shared/components/button-edit-or-delete/button-edit-or-delete.module';

@NgModule({
  declarations: [StagesMenuComponent, ManageAccessComponent, EditRolUserComponent, CreateUsersComponent, MaUserCardComponent, MaUserCardListComponent],
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
    TooltipModule,
    SectionBreadcrumbModule,
    ButtonEditOrDeleteModule
  ]
})
export class StagesMenuModule { }
