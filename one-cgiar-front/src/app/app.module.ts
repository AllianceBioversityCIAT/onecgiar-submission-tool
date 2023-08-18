import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

//? Components
import { CoordinatorModalComponent } from './shared/components/coordinator-modal/coordinator-modal.component';
import { AddCoordinatorModalComponent } from './shared/components/add-coordinator-modal/add-coordinator-modal.component';
import { CoordinatorFilterPipe } from './shared/pipes/coordinator-filter.pipe';
import { CreateUserModalComponent } from './shared/components/create-user-modal/create-user-modal.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomFormsModule } from './shared/components/custom-forms/custom-forms.module';
import { IbdAngularComponentsModule } from 'ibd-angular-components';

//? Module of components
import { InitiativeCreatorModule } from './pages/stages-container/stages/shared/components/initiative-creator/initiative-creator.module';

//? Others
// import { NgxHotjarRouterModule, NgxHotjarModule } from 'ngx-hotjar';
import { environment } from '../environments/environment';
import { CurrencyPipe } from '@angular/common';
import { LoginModule } from './pages/login/login.module';
import { JwtExpirationSubscriptionModule } from './shared/components/jwt-expiration-subscription/jwt-expiration-subscription.module';
import { FooterModule } from './shared/components/footer/footer.module';
import { HeaderModule } from './shared/components/header/header.module';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { DevTagModule } from './shared/components/dev-tag/dev-tag.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from './material.module';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { HttpRequestInterceptor } from './shared/interceptors/http-request.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { AppErrorHandler } from './shared/utils/app-error-handler';
import { GoogleAnalyticsModule } from './shared/components/google-analytics/google-analytics.module';
import { SearchByTextPipe } from './shared/pipes/search-by-text.pipe';
import { MenuSearchComponent } from './shared/components/menu-search/menu-search.component';
import { MenuSearchPipe } from './shared/pipes/menu-search.pipe';
import { ContactModalModule } from './shared/components/contact-modal/contact-modal.module';
@NgModule({
  declarations: [
    AppComponent,
    CoordinatorModalComponent,
    AddCoordinatorModalComponent,
    CoordinatorFilterPipe,
    CreateUserModalComponent,
    SearchByTextPipe,
    MenuSearchPipe,
    MenuSearchComponent,
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
    GoogleAnalyticsModule,
    // NgxHotjarModule.forRoot(environment.hotjar),
    // NgxHotjarRouterModule,
    MaterialModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CustomFormsModule,
    IbdAngularComponentsModule,
    InitiativeCreatorModule,
    LoginModule,
    JwtExpirationSubscriptionModule,
    //? shared component modules
    FooterModule,
    HeaderModule,
    NavbarModule,
    DevTagModule,
    NgxSpinnerModule,
    ContactModalModule,
  ],
  providers: [
    CurrencyPipe,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
