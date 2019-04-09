import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {ProductsComponent} from './products/products.component'
import {ProductDetailComponent} from './products/product-detail/product-detail.component'
import {SalesComponent} from './sales/sales.component'
import {CustomersComponent} from './customers/customers.component'
import {UsersComponent} from './users/users.component'
import {ReportsComponent} from './reports/reports.component'
import {SettingsComponent} from './settings/settings.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', pathMatch: 'full', component: ProductsComponent },
  { path: 'products/new', component: ProductDetailComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent }
 
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

