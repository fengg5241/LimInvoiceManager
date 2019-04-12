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
import {ReportsComponent} from './reports/reports.component'
import {SettingsComponent} from './settings/settings.component'

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
  { path: 'users/new', component: ProductDetailComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent }
 
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

