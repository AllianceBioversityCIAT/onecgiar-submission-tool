import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkPackageRoutingModule } from './work-package-routing.module';
import { WorkPackageComponent } from './work-package.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonsModule } from '../../../../../../../../shared/components/skeletons/skeletons.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { GeographicScopeModule } from '../../../../../shared/components/geographic-scope/geographic-scope.module';
import { UtilsModule } from '../../../../../../../../shared/components/utils/utils.module';
import {TabViewModule} from 'primeng/tabview';


@NgModule({
  declarations: [WorkPackageComponent],
  imports: [
    CommonModule,
    WorkPackageRoutingModule,
    UtilsModule,
    GeographicScopeModule,
    IbdAngularComponentsModule,
    SkeletonsModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkPackageModule { }
