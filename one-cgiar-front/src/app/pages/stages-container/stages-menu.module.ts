import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SharedModule } from '../../shared/modules/shared-module.module'
import { StagesMenuRoutingModule } from './stages-menu-routing.module';
import { StagesMenuComponent } from './stages-menu.component';
import { MaterialModule } from '@app/material.module';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { UtilsModule } from '../../shared/components/utils/utils.module';


@NgModule({
  declarations: [StagesMenuComponent,MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    StagesMenuRoutingModule,
    MaterialModule,
    UtilsModule
  ]
})
export class StagesMenuModule { }
