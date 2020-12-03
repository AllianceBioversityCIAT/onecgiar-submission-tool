import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@shared/components/header/header.component';
import { MaterialModule } from '@app/material.module';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminInterceptor } from '@shared/interceptors/admin-interceptor';
import { CreateInitiativeComponent } from './pages/create-initiative/create-initiative.component';
import { GeneralInformationComponent } from './shared/components/general-information/general-information.component';
import { NarrativesComponent } from './shared/components/narratives/narratives.component';
import { GeographicScopeComponent } from './shared/components/geographic-scope/geographic-scope.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CreateInitiativeComponent, GeneralInformationComponent, NarrativesComponent, GeographicScopeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
