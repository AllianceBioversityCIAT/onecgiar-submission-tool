import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementPAndPolicyCRoutingModule } from './management-p-and-policy-c-routing.module';
import { ManagementPAndPolicyCComponent } from './management-p-and-policy-c.component';


@NgModule({
  declarations: [ManagementPAndPolicyCComponent],
  imports: [
    CommonModule,
    ManagementPAndPolicyCRoutingModule
  ]
})
export class ManagementPAndPolicyCModule { }
