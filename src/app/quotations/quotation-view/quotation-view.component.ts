import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as accounting from 'accounting/accounting.js';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.css']
})
export class QuotationView implements OnInit {
  @Input() name;

  $biller = {
    logo: '2.jpg',
    company: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    cf1: '',
    cf2: '',
    cf3: '',
    cf4: '',
    cf5: '',
    cf6: ''
  };

  $customer = {
    company: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    cf1: '',
    cf2: '',
    cf3: '',
    cf4: '',
    cf5: '',
    cf6: ''
  };

  $inv = {
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
    companyId: null,
    referenceNo: '',
    customerId: '',
    dueDate: '',
    shipping: '',
    orderDiscountId: '',
    orderDiscount: '',
    productDiscount: '',
    totalDiscount: '',
    orderTaxId: '',
    orderTax: '',
    totalTax: '',
    total: '',
    grandTotal: '',
    status: '',
    // recurring:"",
    note: ''
  };

  $settings: any;

  constructor(
    public activeModal: NgbActiveModal,
    private langService: LangService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initModal();
  }

  async initTable() {
    let sysSettings = localStorage.getItem('LimSysSettings');
    if (sysSettings) {
      this.$settings = sysSettings;
    } else {
      let sysSettings1 = await this.http
        .get('/api/sysSetting/selectAll')
        .toPromise();
      this.$settings = sysSettings1[0];
    }
  }

  formatMoney(x, symbol) {
    let thisObject = this;
    if (!symbol) {
      symbol = '';
    }
    return accounting.formatMoney(
      x,
      symbol,
      thisObject.$settings.decimals,
      thisObject.$settings.thousandsSep == 0
        ? ' '
        : thisObject.$settings.thousandsSep,
      thisObject.$settings.decimalsSep,
      '%s%v'
    );
  }
}
