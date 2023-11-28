import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleAnalyticsComponent } from './google-analytics.component';



@NgModule({
  declarations: [GoogleAnalyticsComponent],
  exports: [GoogleAnalyticsComponent],
  imports: [
    CommonModule
  ]
})
export class GoogleAnalyticsModule { }
