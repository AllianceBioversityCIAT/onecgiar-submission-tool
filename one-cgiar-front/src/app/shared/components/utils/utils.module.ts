import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from './section-title/section-title.component';
import { SectionSubTitleComponent } from './section-sub-title/section-sub-title.component';
import { UnderConstructionPageComponent } from '../utils/under-construction-page/under-construction-page.component';
import { SectionAlertsPackComponent } from './section-alerts-pack/section-alerts-pack.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { TextNotDataComponent } from './text-not-data/text-not-data.component';
// import { IbdAngularComponentsModule } from '../../../../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
import { InformationButtonComponent } from './information-button/information-button.component';
import { ItemInformationButtonComponent } from './item-information-button/item-information-button.component';
import { ClipboardIconComponent } from './clipboard-icon/clipboard-icon.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReadMoreContainerComponent } from './read-more-container/read-more-container.component';
import { MultipleSelectItemComponent } from './multiple-select-item/multiple-select-item.component';

const mycomponents = [
  SectionTitleComponent,
  SectionSubTitleComponent,
  UnderConstructionPageComponent,
  SectionAlertsPackComponent,
  TextNotDataComponent,
  InformationButtonComponent,
  ItemInformationButtonComponent,
  ClipboardIconComponent,
  ReadMoreContainerComponent,
  MultipleSelectItemComponent
];
const myModules = [
  IbdAngularComponentsModule,
  ClipboardModule,
  ToastModule
];




@NgModule({
  declarations: [...mycomponents],
  imports: [CommonModule,...myModules],
  exports: [...mycomponents],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[MessageService]
})
export class UtilsModule { }
