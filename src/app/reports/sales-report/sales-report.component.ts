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
    productName: null,
    customerId:null,
    customerFields: null,
    createdBy: null,
    status: null,
    startDate: null,
    endDate: new Date().toISOString().split('T')[0]
  };

  $settings: any;
  $companies:any
  $customers:any;
  sales:any;
  $users:any;
  searchUser = null;
  tableInstance = null;
  $total = 0;
  $paid = 0;
  $pp = 0;
  $pending = 0;
  $overdue = 0;
  $cancelled = 0;
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


  searchSalesReport(){
    this.searchUser = null;
    
    this.http.post('/api/sales/getSalesReport',this.searchParams).subscribe(data => {
      this.sales = data;
      this.searchUser = this.customerMap[this.searchParams.customerId];
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

      if(this.searchParams.customerId && this.sales ){
        for (const index in this.sales) {
          let e = this.sales[index];
          if(e.status === "paid"){
            this.$paid += 1;
          }else if(e.status === "partial"){
            this.$pp += 1;
          }else if(e.status === "pending"){
            this.$pending += 1;
          }else if(e.status === "overdue"){
            this.$overdue += 1;
          }else if(e.status === "canceled"){
            this.$cancelled += 1;
          }

          this.$tpp.total += e.grandTotal;
          this.$tpp.paid += e.paid;
        }
      }

      function status(x) {
        switch (x) {
          case 'paid':
                return '<div class="text-center"><small><a id="'+x+'" href="#myModal" role="button" data-toggle="modal" class="st"><span class=" label label-success">'+thisObject.lang(x)+'</span></a></small></div>';
                break;

          case 'partial':
                return '<div class="text-center"><small><a id="'+x+'" href="#myModal" role="button" data-toggle="modal" class="st"><span class="label label-info">'+thisObject.lang(x)+'</span></a></small></div>';
                break;

          case 'pending':
                return '<div class="text-center"><small><a id="'+x+'" href="#myModal" role="button" data-toggle="modal" class="st"><span class="label label-warning">'+thisObject.lang(x)+'</span></a></small></div>';
                break;

          case 'overdue':
                return '<div class="text-center"><small><a id="'+x+'" href="#myModal" role="button" data-toggle="modal" class="st"><span class="label label-danger">'+thisObject.lang(x)+'</span></a></small></div>';
                break;

          case 'canceled':
                return '<div class="text-center"><small><a id="'+x+'" href="#myModal" role="button" data-toggle="modal" class="st"><span class="label label-danger">'+thisObject.lang(x)+'</span></a></small></div>';
                break;

          default:
                return '<div class="text-center"><a id="'+x+'" href="#myModal" role="button" data-toggle="modal" class="st">'+thisObject.lang(x)+'</a></div>';
        }
      }

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
              exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
            },
            {
              extend: 'excelHtml5',
              footer: true,
              exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
            },
            {
              extend: 'csvHtml5',
              footer: true,
              exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
            },
            {
              extend: 'pdfHtml5',
              orientation: 'landscape',
              pageSize: 'A4',
              footer: true,
              exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
            }
            //   { extend: 'colvis', text: 'Columns'},
          ],
          columns: [
            null,
            null, //"render": fld
            null,
            null,
            null,
            null,
            null, //"render": cf
            null, //"render": cf
            null, //"render": cf
            null, //"render": cf,
            { render: status }
           
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
