import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from './section-title/section-title.component';
import { SectionSubTitleComponent } from './section-sub-title/section-sub-title.component';
import { UnderConstructionPageComponent } from '../utils/under-construction-page/under-construction-page.component';
import { SectionBreadcrumbComponent } from './section-breadcrumb/section-breadcrumb.component';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
const mycomponents = [
  SectionTitleComponent,
  SectionSubTitleComponent,
  UnderConstructionPageComponent,
  SectionBreadcrumbComponent
];
const myModules = [
];




@NgModule({
  declarations: [...mycomponents],
  imports: [CommonModule,...myModules],
  exports: [...mycomponents],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UtilsModule { }
