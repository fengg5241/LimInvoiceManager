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
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
})
export class PaymentReportComponent implements OnInit {

  $page_title = 'Payment Report';
  searchParams = {
    customerId:null,
    customerFields: null,
    startDate: null,
    endDate: new Date().toISOString().split('T')[0],
    note:null
  };

  $settings: any;
  $companies:any
  $customers:any;
  sales:any;
  $users:any;
  searchUser: null;
  tableInstance = null;
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

  customerMap = {};

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
    if(sysSettings){
      this.$settings = JSON.parse(sysSettings);
  }else {
      let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
      this.$settings = sysSettings1[0];
      localStorage.setItem("LimSysSettings",JSON.stringify(sysSettings1[0]));
  }

    this.http.get('/api/user/selectAll').subscribe(data => {
      this.$users = data;
    });

    this.http.get('/api/customer/selectAll').subscribe(data => {
      this.$customers = data;

      for (const index in this.$customers) {
        let e = this.$customers[index];
        this.customerMap[e.id] = e;
      }

    });
    // this.$tax_rates = await this.http.get('/api/taxRate/selectAll').toPromise();
  }


  searchPaymentReport(){
    if(this.searchParams.customerId){
      this.showCustomerSalesReport(this.searchParams);
    }

    this.http.post('/api/payment/getPaymentReport',this.searchParams).subscribe(data => {
      this.sales = data;

      let thisObject = this;
      $(document).ready(function() {
        var table = $('#fileData').DataTable({
          dom:
            '<"text-center"<"btn-group"B>><"clear"><"row"<"col-md-6"l><"col-md-6 pr0"p>r>t<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
          lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, 'All']],
          order: [[1, 'asc']],
          pageLength: thisObject.$settings.rowsPerPage,
          retrieve: true,
          buttons: [
            {
              extend: 'copyHtml5',
              exportOptions: { columns: [0, 1, 2, 3, 4] }
            },
            {
              extend: 'excelHtml5',
              footer: true,
              exportOptions: { columns: [0, 1, 2, 3, 4] }
            },
            {
              extend: 'csvHtml5',
              footer: true,
              exportOptions: { columns: [0, 1, 2, 3, 4] }
            },
            {
              extend: 'pdfHtml5',
              orientation: 'landscape',
              pageSize: 'A4',
              footer: true,
              exportOptions: { columns: [0, 1, 2, 3, 4] }
            }
            //   { extend: 'colvis', text: 'Columns'},
          ],
          columns: [
            null,
            null, //"render": fld
            null,
            null,
            null,
            null
          ]
        });

        thisObject.tableInstance = table;

        $('#fileData tfoot th:not(:last-child)').each(function() {
          var title = $(this).text();
          $(this).html(
            '<input type="text" class="text_filter" placeholder="' +
              title +
              '" />'
          );
        });

        $('#search_table').on('keyup change', function(e) {
          var code = e.keyCode ? e.keyCode : e.which;
          if (
            (code == 13 && table.search() !== this.value) ||
            (table.search() !== '' && this.value === '')
          ) {
            table.search(this.value).draw();
          }
        });


        table.columns().every(function() {
          var self = this;
          $('input', this.footer()).on('keyup change', function(e) {
            var code = e.keyCode ? e.keyCode : e.which;
            if (
              (code == 13 && self.search() !== this.value) ||
              (self.search() !== '' && this.value === '')
            ) {
              self.search(this.value).draw();
            }
          });
        });
      });
    });
  }


  showCustomerSalesReport(searchParams) {
    this.http.post('/api/sales/getSalesReport',searchParams).subscribe(data => {
      let sales = data;

      this.$total = 0;
      this.$paid = 0;
      this.$pp = 0;
      this.$pending = 0;
      this.$overdue = 0;
      this.$cancelled = 0;
      this.$tpp = {
        total: 0,
        paid: 0
      };

      if(this.searchParams.customerId && sales ){
        this.searchUser = this.customerMap[this.searchParams.customerId];
        
        for (const index in sales) {
          let e = sales[index];
          if(e.status === "paid"){
            this.$paid += 1;
          }else if(e.status === "partial"){
            this.$pp += 1;
          }else if(e.status === "pending"){
            this.$pending += 1;
          }else if(e.staatus === "overdue"){
            this.$overdue += 1;
          }else if(e.status === "canceled"){
            this.$cancelled += 1;
          }

          this.$tpp.total += e.grandTotal;
          this.$tpp.paid += e.paid;
        }
      }
    });
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
