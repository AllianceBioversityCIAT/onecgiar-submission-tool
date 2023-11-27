import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompactInformationTableViewComponent } from './compact-information-table-view.component';
import { ButtonEditOrDeleteModule } from '../../../pages/stages-container/stages/shared/components/button-edit-or-delete/button-edit-or-delete.module';



@NgModule({
  declarations: [CompactInformationTableViewComponent],
  exports: [CompactInformationTableViewComponent],
  imports: [
    CommonModule,
    ButtonEditOrDeleteModule
  ]
})
export class CompactInformationTableViewModule { }
