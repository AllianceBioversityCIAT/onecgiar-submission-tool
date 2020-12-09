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
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { InitTableComponent } from './shared/components/init-table/init-table.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateInitiativeComponent } from './pages/create-initiative/create-initiative.component';
import { GeneralInformationComponent } from './shared/components/general-information/general-information.component';
import { NarrativesComponent } from './shared/components/narratives/narratives.component';
import { GeographicScopeComponent } from './shared/components/geographic-scope/geographic-scope.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { KeyPartnersComponent } from './shared/components/key-partners/key-partners.component';
import { FeedbackComponent } from './shared/components/feedback/feedback.component';
import { CountryControlComponent } from './shared/components/country-control/country-control.component';
import { RegionControlComponent } from './shared/components/region-control/region-control.component';
import { MenuComponent } from './shared/components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    InitTableComponent,
    CreateInitiativeComponent,
    GeneralInformationComponent,
    NarrativesComponent,
    GeographicScopeComponent,
    KeyPartnersComponent,
    FeedbackComponent,
    CountryControlComponent,
    RegionControlComponent,
    MenuComponent
  ],
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
export class AppModule { }
