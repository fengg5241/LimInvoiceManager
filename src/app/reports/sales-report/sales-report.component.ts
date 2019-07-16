import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';
import { UtilService } from '../../common/util.service';
import * as accounting from 'accounting/accounting.js';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.html5';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  $page_title = 'Sales Report';
  searchParams = {
    pruductId: null,
    companyId:null,
    customFields: null,
    createdBy: null,
    status: null,
    start_date: null,
    end_date: new Date().toISOString().split('T')[0]
  };

  $settings: any;
  $customers = [];
  $users =  [];
  searchUser: null;
  $total: 0;
  $paid: 0;
  $pp: 0;
  $pending: 0;
  $overdue: 0;
  $cancelled: 0;
  $tpp = {
    total: 0,
    paid: 0
  };

  constructor(
    private langService: LangService,
    private utilService: UtilService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.initUI();
  }

  async initUI() {
    let sysSettings = localStorage.getItem('LimSysSettings');
    if (sysSettings) {
      this.$settings = sysSettings;
    } else {
      let sysSettings1 = await this.http
        .get('/api/sysSetting/selectAll')
        .toPromise();
      this.$settings = sysSettings1[0];
    }
    // this.$tax_rates = await this.http.get('/api/taxRate/selectAll').toPromise();
  }


  lang(word) {
    return this.langService.lang(word);
}

  formatMoney(x, symbol) {
    if (!symbol) {
      symbol = '';
    }
    return accounting.formatMoney(
      x,
      symbol,
      this.$settings.decimals,
      this.$settings.thousandsSep == 0 ? ' ' : this.$settings.thousandsSep,
      this.$settings.decimalsSep,
      '%s%v'
    );
  }
}
