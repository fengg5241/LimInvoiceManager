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
  @Input() quoteId;
  $biller:any;
  // $biller = {
  //   logo: '2.jpg',
  //   company: '',
  //   name: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   postalCode: '',
  //   country: '',
  //   cf1: '',
  //   cf2: '',
  //   cf3: '',
  //   cf4: '',
  //   cf5: '',
  //   cf6: '',
  //   ssImage:""
  // };

  $customer:any;
  // $customer = {
  //   company: '',
  //   name: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   postalCode: '',
  //   country: '',
  //   cf1: '',
  //   cf2: '',
  //   cf3: '',
  //   cf4: '',
  //   cf5: '',
  //   cf6: ''
  // };
  $inv:any;
  // $inv = {
  //   date: new Date().toISOString().split('T')[0],
  //   expiryDate: '',
  //   companyId: null,
  //   referenceNo: '',
  //   customerId: '',
  //   dueDate: '',
  //   shipping: '',
  //   orderDiscountId: '',
  //   orderDiscount: '',
  //   productDiscount: '',
  //   totalDiscount: '',
  //   orderTaxId: '',
  //   orderTax: '',
  //   totalTax: '',
  //   total: '',
  //   grandTotal: '',
  //   status: '',
  //   // recurring:"",
  //   note: ''
  // };



  $settings: any;
  quoteItems: any;
  $cols = 4;

  constructor(
    public activeModal: NgbActiveModal,
    private langService: LangService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initModal();
  }

  async initModal() {
    let sysSettings = localStorage.getItem('LimSysSettings');
    if(sysSettings){
      this.$settings = JSON.parse(sysSettings);
  }else {
      let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
      this.$settings = sysSettings1[0];
      localStorage.setItem("LimSysSettings",JSON.stringify(sysSettings1[0]));
  }

    this.$inv = await this.http.get('/api/quotation/selectById/' + this.quoteId).toPromise();
    this.$inv.date = this.$inv.date.split('T')[0];
    this.$inv.expiryDate = this.$inv.expiryDate ? this.$inv.expiryDate.split(
        'T'
      )[0] : null;
    
    let companyId = this.$inv.companyId ? this.$inv.companyId : 1;
    this.http.get('/api/company/selectById/'+ companyId).subscribe(data => {
      this.$biller = data;
    });

    this.http.get('/api/customer/selectById/'+ this.$inv.customerId).subscribe(data => {
      this.$customer = data;
    });
    this.quoteItems = await this.http
        .get('/api/quotationItem/selectByQuoteId/' + this.quoteId)
        .toPromise();
  }

  
  getDiscountCols(){
    let col = this.$cols - 2;
    if(this.$settings.productDiscount) { col += 1; }
    if(this.$settings.defaultTaxRate) { col += 1; }

    return col;
  }

  lang(word) {
    return this.langService.lang(word);
  }

  getStatusPng(){
    return "assets/img/"+this.$inv.status+".png";
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
