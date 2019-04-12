import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

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
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
