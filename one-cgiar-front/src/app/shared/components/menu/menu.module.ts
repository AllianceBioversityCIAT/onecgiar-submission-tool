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
import { MenuSubSectionComponent } from './components/menu-sub-section/menu-sub-section.component';
import { MenuSubSectionPreviewComponent } from './components/menu-sub-section-preview/menu-sub-section-preview.component';
import { MenuDynamicListComponent } from './components/menu-dynamic-list/menu-dynamic-list.component';
import { ButtonAddElementModule } from '../../../pages/stages-container/stages/shared/components/button-add-element/button-add-element.module';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    MenuComponent,
    MenuStageComponent,
    MenuSectionComponent,
    MenuSubSectionComponent,
    MenuSubSectionPreviewComponent,
    MenuDynamicListComponent,
    MenuSubSectionPreviewComponent
  ],
  exports: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    UtilsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    IbdAngularComponentsModule,
    ButtonAddElementModule,
    DialogModule,
    CardModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuModule { }
