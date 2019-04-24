import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {ProductsComponent} from './products/products.component'
import {ProductDetailComponent} from './products/product-detail/product-detail.component'
import {ProductUploadComponent} from './products/product-upload/product-upload.component'
import {SalesComponent} from './sales/sales.component'
import {CustomersComponent} from './customers/customers.component'
import {CustomerDetailComponent} from './customers/customer-detail/customer-detail.component'
import {CustomerUploadComponent} from './customers/customer-upload/customer-upload.component'
import {UsersComponent} from './users/users.component'
import {UserDetailComponent} from './users/user-detail/user-detail.component'
import {ReportsComponent} from './reports/reports.component'
import {SettingsComponent} from './settings/settings.component'
import { SystemSettingComponent } from './settings/system-setting/system-setting.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', pathMatch: 'full', component: ProductsComponent },
  { path: 'products/new', component: ProductDetailComponent },
  { path: 'products/upload', component: ProductUploadComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/new', component: CustomerDetailComponent },
  { path: 'customers/upload', component: CustomerUploadComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/new', component: UserDetailComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'settings/systemSetting', component: SystemSettingComponent },
  { path: 'settings/paypalSetting', component: PaypalSettingComponent },
  { path: 'settings/skrillSetting', component: SkrillSettingComponent },
  { path: 'settings/stripeSetting', component: StripeSettingComponent },
  { path: 'settings/companies', component: CompanySettingComponent },
  { path: 'settings/companies/new', component: CompanyDetailComponent },
  { path: 'settings/companies/edit/:id', component: CompanyDetailComponent },
  { path: 'settings/textRate', component: TaxRateSettingComponent },
  { path: 'settings/textRate/new', component: TaxRateDetailComponent },
  { path: 'settings/notesSetting', component: NotesSettingComponent },
  { path: 'settings/backupSetting', component: BackupsSettingComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

