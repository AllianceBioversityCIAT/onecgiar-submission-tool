import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompactInformationTableViewComponent } from './compact-information-table-view.component';



@NgModule({
  declarations: [CompactInformationTableViewComponent],
  exports: [CompactInformationTableViewComponent],
  imports: [
    CommonModule
  ]
})
export class CompactInformationTableViewModule { }
