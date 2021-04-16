import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from '@shared/components/header/header.component';
import { MaterialModule } from '@app/material.module';
import { SidebarModule } from '@shared/components/sidebar/sidebar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { HttpRequestInterceptor } from '@shared/interceptors/http-request.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { AppErrorHandler } from '@shared/utils/app-error-handler';

import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { InitTableComponent } from './shared/components/init-table/init-table.component';
import { HomeComponent } from './pages/home/home.component';
import { StagesMenuComponent } from './pages/stages-container/stages-menu.component';
import { GeneralInformationComponent } from './shared/components/preconcept/general-information/general-information.component';
import { NarrativesComponent } from './shared/components/preconcept/narratives/narratives.component';
import { GeographicScopeComponent } from './shared/components/preconcept/geographic-scope/geographic-scope.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { KeyPartnersComponent } from './shared/components/preconcept/key-partners/key-partners.component';
import { FeedbackComponent } from './shared/components/preconcept/feedback/feedback.component';
import { CountryControlComponent } from './shared/components/preconcept/country-control/country-control.component';
import { RegionControlComponent } from './shared/components/preconcept/region-control/region-control.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { NarrativesConceptComponent } from './shared/components/concept/narratives-concept/narratives-concept.component';
import { CoordinatorModalComponent } from './shared/components/coordinator-modal/coordinator-modal.component';
import { AddCoordinatorModalComponent } from './shared/components/add-coordinator-modal/add-coordinator-modal.component';
import { CoordinatorFilterPipe } from './shared/pipes/coordinator-filter.pipe';
import { GeneralInformationConceptComponent } from './shared/components/concept/general-information-concept/general-information-concept.component';
import { TheoryOfChangeComponent } from './shared/components/concept/theory-of-change/theory-of-change.component';
import { WorkPackagesComponent } from './shared/components/concept/work-packages/work-packages.component';
import { ProjectionIndicatorsModalComponent } from './shared/components/concept/projection-indicators-modal/projection-indicators-modal.component';
import { KeyPartnersConceptComponent } from './shared/components/concept/key-partners-concept/key-partners-concept.component';
import { AddPartnersModalComponent } from './shared/components/concept/add-partners-modal/add-partners-modal.component';
import { CreateUserModalComponent } from './shared/components/create-user-modal/create-user-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CreateInitiativeModalComponent } from './shared/components/create-initiative-modal/create-initiative-modal.component';
import { WorkPackageComponent } from './shared/components/concept/work-package/work-package.component';
import { CustomFormsModule } from './shared/components/custom-forms/custom-forms.module';
import { DevTagComponent } from './shared/components/dev-tag/dev-tag.component';
import { DevPanelComponent } from './shared/components/dev-panel/dev-panel.component';
import { ManageAccessComponent } from './shared/components/manage-access/manage-access.component';
import { CreateUsersComponent } from './shared/components/create-users/create-users.component';
import { EditRolUserComponent } from './shared/components/edit-rol-user/edit-rol-user.component';
import { DialogConfirmComponent } from './shared/components/dialog-confirm/dialog-confirm.component';

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
    // StagesMenuComponent,
    GeneralInformationComponent,
    NarrativesComponent,
    GeographicScopeComponent,
    KeyPartnersComponent,
    FeedbackComponent,
    CountryControlComponent,
    RegionControlComponent,
    // MenuComponent,
    NarrativesConceptComponent,
    CoordinatorModalComponent,
    AddCoordinatorModalComponent,
    CoordinatorFilterPipe,
    GeneralInformationConceptComponent,
    TheoryOfChangeComponent,
    WorkPackagesComponent,
    ProjectionIndicatorsModalComponent,
    KeyPartnersConceptComponent,
    AddPartnersModalComponent,
    CreateInitiativeModalComponent,
    CreateUserModalComponent,
    WorkPackageComponent,
    DevTagComponent,
    DevPanelComponent,
    ManageAccessComponent,
    CreateUsersComponent,
    EditRolUserComponent,
    DialogConfirmComponent,
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
    FormsModule,
    SweetAlert2Module.forRoot(),
    QuillModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    CustomFormsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
