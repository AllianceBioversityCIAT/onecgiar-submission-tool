import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from './section-title/section-title.component';
import { SectionSubTitleComponent } from './section-sub-title/section-sub-title.component';
import { UnderConstructionPageComponent } from '../utils/under-construction-page/under-construction-page.component';
import { SectionBreadcrumbComponent } from './section-breadcrumb/section-breadcrumb.component';
import { SectionAlertsPackComponent } from './section-alerts-pack/section-alerts-pack.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { TextNotDataComponent } from './text-not-data/text-not-data.component';
// import { IbdAngularComponentsModule } from '../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';

const mycomponents = [
  SectionTitleComponent,
  SectionSubTitleComponent,
  UnderConstructionPageComponent,
  SectionBreadcrumbComponent,
  SectionAlertsPackComponent,
  TextNotDataComponent
];
const myModules = [
  IbdAngularComponentsModule
];




@NgModule({
  declarations: [...mycomponents],
  imports: [CommonModule,...myModules],
  exports: [...mycomponents],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UtilsModule { }
