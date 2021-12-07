import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { MenuStageComponent } from './components/menu-stage/menu-stage.component';
import { UtilsModule } from '../utils/utils.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { MenuSectionComponent } from './components/menu-section/menu-section.component';



@NgModule({
  declarations: [
    MenuComponent,
    MenuStageComponent,
    MenuSectionComponent
  ],
  exports: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    UtilsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    IbdAngularComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuModule { }
