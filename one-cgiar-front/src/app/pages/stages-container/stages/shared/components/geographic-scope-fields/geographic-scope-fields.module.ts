import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeographicScopeFieldsComponent } from './geographic-scope-fields.component';
import { SectionSubTitleComponent } from '../../../../../../shared/components/utils/section-sub-title/section-sub-title.component';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from '../../../../../../shared/components/utils/utils.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { SkeletonsModule } from '../../../../../../shared/components/skeletons/skeletons.module';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [GeographicScopeFieldsComponent],
  exports: [GeographicScopeFieldsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IbdAngularComponentsModule,
    SkeletonsModule,
    UtilsModule,
    MatButtonModule
  ]
})
export class GeographicScopeFieldsModule { }
