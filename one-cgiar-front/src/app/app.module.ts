import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { MaterialModule } from './material.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { HttpRequestInterceptor } from './shared/interceptors/http-request.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { AppErrorHandler } from './shared/utils/app-error-handler';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { StagesMenuComponent } from './pages/stages-container/stages-menu.component';
// import { GeneralInformationComponent } from './shared/components/preconcept/general-information/general-information.component';
// import { NarrativesComponent } from './shared/components/preconcept/narratives/narratives.component';
// import { GeographicScopeComponent } from './shared/components/preconcept/geographic-scope/geographic-scope.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { KeyPartnersComponent } from './shared/components/preconcept/key-partners/key-partners.component';
import { FeedbackComponent } from './shared/components/preconcept/feedback/feedback.component';
// import { CountryControlComponent } from './shared/components/preconcept/country-control/country-control.component';
// import { RegionControlComponent } from './shared/components/preconcept/region-control/region-control.component';
// import { NarrativesConceptComponent } from './shared/components/concept/narratives-concept/narratives-concept.component';
import { CoordinatorModalComponent } from './shared/components/coordinator-modal/coordinator-modal.component';
import { AddCoordinatorModalComponent } from './shared/components/add-coordinator-modal/add-coordinator-modal.component';
import { CoordinatorFilterPipe } from './shared/pipes/coordinator-filter.pipe';
// import { TheoryOfChangeComponent } from './shared/components/concept/theory-of-change/theory-of-change.component';
// import { WorkPackagesComponent } from './shared/components/concept/work-packages/work-packages.component';
// import { ProjectionIndicatorsModalComponent } from './shared/components/concept/projection-indicators-modal/projection-indicators-modal.component';
// import { KeyPartnersConceptComponent } from './shared/components/concept/key-partners-concept/key-partners-concept.component';
// import { AddPartnersModalComponent } from './shared/components/concept/add-partners-modal/add-partners-modal.component';
// import { CreateUserModalComponent } from './shared/components/create-user-modal/create-user-modal.component';
// import { MatTableModule } from '@angular/material/table';
// import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
// import { CreateInitiativeModalComponent } from './shared/components/create-initiative-modal/create-initiative-modal.component';
// import { WorkPackageComponent } from './shared/components/concept/work-package/work-package.component';
import { CustomFormsModule } from './shared/components/custom-forms/custom-forms.module';
import { DevTagComponent } from './shared/components/dev-tag/dev-tag.component';
import { DevPanelComponent } from './shared/components/dev-panel/dev-panel.component';
// import { ChangePasswordComponent } from './shared/components/login/change-password/change-password.component';
// import { PobContributionComponent } from './shared/components/concept/work-package/pob-contribution/pob-contribution.component';
// import { ProjectionTimeFrameComponent } from './shared/components/concept/projection-indicators-modal/projection-time-frame/projection-time-frame.component';
// import { IbdAngularComponentsModule } from 'ibd-angular-components';
// import { IbdAngularComponentsModule } from '../../../../ibd-angular-library/projects/ibd-angular-components/src/lib/ibd-angular-components.module';
// import {InputTextModule} from 'primeng/inputtext';
import { TawkToComponent } from './shared/components/tawk-to/tawk-to.component';
// import { NgxHotjarRouterModule, NgxHotjarModule } from 'ngx-hotjar';
import { environment } from '../environments/environment';
import { CurrencyPipe } from '@angular/common';
// import { IbdAngularComponentsModule } from 'ibd-angular-components';
import { InitTableModule } from './shared/components/init-table/init-table.module';
import { CreateUserModalModule } from './shared/components/create-user-modal/create-user-modal.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    NotFoundComponent,
    HomeComponent,
    // GeneralInformationComponent,
    // NarrativesComponent,
    // GeographicScopeComponent,
    // KeyPartnersComponent,
    FeedbackComponent,
    // CountryControlComponent,
    // RegionControlComponent,
    // NarrativesConceptComponent,
    CoordinatorModalComponent,
    AddCoordinatorModalComponent,
    CoordinatorFilterPipe,
    // TheoryOfChangeComponent,
    // WorkPackagesComponent,
    // ProjectionIndicatorsModalComponent,
    // KeyPartnersConceptComponent,
    // AddPartnersModalComponent,
    // CreateInitiativeModalComponent,
    // CreateUserModalComponent,
    // WorkPackageComponent,
    DevTagComponent,
    DevPanelComponent,
    // ChangePasswordComponent,
    // ProjectionTimeFrameComponent,
    TawkToComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidebarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    QuillModule.forRoot(),
    MatPaginatorModule,
    NgxSpinnerModule,
    CustomFormsModule,
    // IbdAngularComponentsModule,
    MaterialModule,
    InitTableModule,
    CreateUserModalModule
    // InputTextModule   
    // NgxHotjarModule.forRoot(environment.hotjar),
    // NgxHotjarRouterModule,
  ],
  providers: [
    CurrencyPipe,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
