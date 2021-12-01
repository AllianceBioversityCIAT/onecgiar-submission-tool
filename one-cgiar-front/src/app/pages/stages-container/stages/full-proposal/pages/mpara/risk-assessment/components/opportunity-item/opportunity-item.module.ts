import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityItemComponent } from './opportunity-item.component';
import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OpportunityItemComponent],
  exports: [OpportunityItemComponent],
  imports: [
    CommonModule,
    IbdAngularComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OpportunityItemModule { }
