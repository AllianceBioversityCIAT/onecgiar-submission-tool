import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FooterModule } from '@app/shared/components/footer/footer.module';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    PanelMenuModule,
    FooterModule,
  ],
})
export class AdminPanelModule {}
