import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {LoginComponent} from './login/login.component'
import {HomeChartComponent} from './home-chart/home-chart.component'
import {ProductsComponent} from './products/products.component'
import {ProductDetailComponent} from './products/product-detail/product-detail.component'
import {ProductUploadComponent} from './products/product-upload/product-upload.component'
import {SalesComponent} from './sales/sales.component'
import {SaleDetailComponent} from './sales/sale-detail/sale-detail.component'
import {PaymentDetailComponent} from './sales/payment-detail/payment-detail.component'
import {PaymentViewComponent} from './sales/payment-view/payment-view.component'
import {PaymentListComponent} from './sales/payment-list/payment-list.component'

import {CustomersComponent} from './customers/customers.component'
import {CustomerDetailComponent} from './customers/customer-detail/customer-detail.component'
import {CustomerUploadComponent} from './customers/customer-upload/customer-upload.component'
import {CustomerUsersComponent} from './customers/customer-users/customer-users.component'
import {CustomerUserDetailComponent} from './customers/customer-user-detail/customer-user-detail.component'
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
import { QuotationsComponent } from './quotations/quotations.component';
import { QuotationView } from './quotations/quotation-view/quotation-view.component';
import { QuotationEmailModalComponent } from './quotations/quotation-email-modal/quotation-email-modal.component';
import { SaleViewComponent } from './sales/sale-view/sale-view.component';
import { QuotationDetailComponent } from './quotations/quotation-detail/quotation-detail.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { SaleEmailModalComponent } from './sales/sale-email-modal/sale-email-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'resetpassword/:id', component: ResetPasswordComponent},
  { path: 'home', component: HomeComponent, children:[
    { path: '',  component: HomeChartComponent },
    { path: 'products',  component: ProductsComponent },
    { path: 'products/new', component: ProductDetailComponent },
    { path: 'products/edit/:id', component: ProductDetailComponent },
    { path: 'products/upload', component: ProductUploadComponent },
    { path: 'sales', component: SalesComponent },
    { path: 'sales/new', component: SaleDetailComponent },
    { path: 'sales/new/:id', component: SaleDetailComponent },
    { path: 'sales/edit/:id', component: SaleDetailComponent },
    { path: 'sales/view:id', component: SaleViewComponent },
    { path: 'sales/emailModal', component: SaleEmailModalComponent },
    { path: 'sales/quotations', component: QuotationsComponent },
    { path: 'sales/quotations/view', component: QuotationView },
    { path: 'sales/quotations/emailModal', component: QuotationEmailModalComponent },
    { path: 'sales/quotations/new', component: QuotationDetailComponent },
    { path: 'sales/quotations/edit/:id', component: QuotationDetailComponent },
    { path: 'sales/payment/edit/:id', component: PaymentDetailComponent },
    { path: 'sales/payment/view/:id', component: PaymentViewComponent },
    { path: 'sales/paymentList', component: PaymentListComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'customers/new', component: CustomerDetailComponent },
    { path: 'customers/edit/:id', component: CustomerDetailComponent },
    { path: 'customers/users/:customerId/:customerName', component: CustomerUsersComponent },
    { path: 'customers/userdetail/new/:customerId', component: CustomerUserDetailComponent },
    { path: 'customers/userdetail/edit/:customerId/:id', component: CustomerUserDetailComponent },
    { path: 'customers/upload', component: CustomerUploadComponent },
    { path: 'changepassword', component: ChangePasswordComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/new', component: UserDetailComponent },
    { path: 'users/edit/:id', component: UserDetailComponent },
    // { path: 'reports', component: ReportsComponent },
    { path: 'reports/daily', component: DailyReportComponent },
    { path: 'reports/sales', component: SalesReportComponent },
    { path: 'reports/payment', component: PaymentReportComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'settings/systemSetting', component: SystemSettingComponent },
    { path: 'settings/paypalSetting', component: PaypalSettingComponent },
    { path: 'settings/skrillSetting', component: SkrillSettingComponent },
    { path: 'settings/stripeSetting', component: StripeSettingComponent },
    { path: 'settings/companies', component: CompanySettingComponent },
    { path: 'settings/companies/new', component: CompanyDetailComponent },
    { path: 'settings/companies/edit/:id', component: CompanyDetailComponent },
    { path: 'settings/taxRate', component: TaxRateSettingComponent },
    { path: 'settings/taxRate/new', component: TaxRateDetailComponent },
    { path: 'settings/taxRate/edit/:id', component: TaxRateDetailComponent },
    { path: 'settings/notesSetting', component: NotesSettingComponent },
    { path: 'settings/backupSetting', component: BackupsSettingComponent },
  ]},
  
  
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

