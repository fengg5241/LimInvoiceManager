import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartModule } from 'angular-highcharts';
import { ChartComponent } from './common/chart/chart.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { CustomersComponent } from './customers/customers.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportsComponent } from './reports/reports.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductUploadComponent } from './products/product-upload/product-upload.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { CustomerUploadComponent } from './customers/customer-upload/customer-upload.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { PaypalSettingComponent } from './settings/paypal-setting/paypal-setting.component';
import { SkrillSettingComponent } from './settings/skrill-setting/skrill-setting.component';
import { StripeSettingComponent } from './settings/stripe-setting/stripe-setting.component';
import { CompanySettingComponent } from './settings/company-setting/company-setting.component';
import { CompanyDetailComponent } from './settings/company-setting/company-detail/company-detail.component';
import { EmailSettingComponent } from './settings/email-setting/email-setting.component';
import { TaxRateSettingComponent } from './settings/tax-rate-setting/tax-rate-setting.component';
import { TaxRateDetailComponent } from './settings/tax-rate-setting/tax-rate-detail/tax-rate-detail.component';
import { NotesSettingComponent } from './settings/notes-setting/notes-setting.component';
import { BackupsSettingComponent } from './settings/backups-setting/backups-setting.component';
import { MonthlyReportComponent } from './reports/monthly-report/monthly-report.component';
import { DailyReportComponent } from './reports/daily-report/daily-report.component';
import { SalesReportComponent } from './reports/sales-report/sales-report.component';
import { PaymentReportComponent } from './reports/payment-report/payment-report.component';
import { SystemSettingComponent } from './settings/system-setting/system-setting.component';
import { QuotationsComponent } from './quotations/quotations.component';
import { QuotationDetailComponent } from './quotations/quotation-detail/quotation-detail.component';

import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { SaleDetailComponent } from './sales/sale-detail/sale-detail.component';
import { QuotationView } from './quotations/quotation-view/quotation-view.component';
import { LoginComponent } from './login/login.component';
import { SaleViewComponent } from './sales/sale-view/sale-view.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppAsideComponent } from './app-aside/app-aside.component';
import { FooterComponent } from './footer/footer.component';
import { HomeChartComponent } from './home-chart/home-chart.component';
import { CustomerUsersComponent } from './customers/customer-users/customer-users.component';
import { CustomerUserDetailComponent } from './customers/customer-user-detail/customer-user-detail.component';
import { ClientComponent } from './client/client.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    ProductsComponent,
    SalesComponent,
    CustomersComponent,
    UsersComponent,
    SettingsComponent,
    ReportsComponent,
    ProductDetailComponent,
    ProductUploadComponent,
    CustomerDetailComponent,
    CustomerUploadComponent,
    UserDetailComponent,
    PaypalSettingComponent,
    SkrillSettingComponent,
    StripeSettingComponent,
    CompanySettingComponent,
    CompanyDetailComponent,
    EmailSettingComponent,
    TaxRateSettingComponent,
    TaxRateDetailComponent,
    NotesSettingComponent,
    BackupsSettingComponent,
    MonthlyReportComponent,
    DailyReportComponent,
    SalesReportComponent,
    PaymentReportComponent,
    SystemSettingComponent,
    QuotationsComponent,
    QuotationDetailComponent,
    SaleDetailComponent,
    QuotationView,
    LoginComponent,
    SaleViewComponent,
    AppHeaderComponent,
    AppAsideComponent,
    FooterComponent,
    HomeChartComponent,
    CustomerUsersComponent,
    CustomerUserDetailComponent,
    ClientComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ChartModule,
    FormsModule,
    HttpClientModule,
    AngularDateTimePickerModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
