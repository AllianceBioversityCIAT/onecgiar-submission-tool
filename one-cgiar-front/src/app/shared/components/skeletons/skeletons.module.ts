import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import { GeographicScopeSkeletonComponent } from './geographic-scope-skeleton/geographic-scope-skeleton.component';
import { GeneralInformationSkeletonComponent } from './general-information-skeleton/general-information-skeleton.component';
import { FpWorkPackageSekeltonComponent } from './fp-work-package-sekelton/fp-work-package-sekelton.component';



@NgModule({
  declarations: [GeographicScopeSkeletonComponent, GeneralInformationSkeletonComponent, FpWorkPackageSekeltonComponent],
  imports: [
    CommonModule,
    SkeletonModule
  ],
  exports:      [GeographicScopeSkeletonComponent, GeneralInformationSkeletonComponent, FpWorkPackageSekeltonComponent]
})
export class SkeletonsModule { }
