import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import { GeographicScopeSkeletonComponent } from './geographic-scope-skeleton/geographic-scope-skeleton.component';
import { GeneralInformationSkeletonComponent } from './general-information-skeleton/general-information-skeleton.component';



@NgModule({
  declarations: [GeographicScopeSkeletonComponent, GeneralInformationSkeletonComponent],
  imports: [
    CommonModule,
    SkeletonModule
  ],
  exports:[GeographicScopeSkeletonComponent, GeneralInformationSkeletonComponent]
})
export class SkeletonsModule { }
