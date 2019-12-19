import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import * as accounting from 'accounting/accounting.js';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SaleViewComponent} from './sale-view/sale-view.component'
import {PaymentDetailComponent} from './payment-detail/payment-detail.component'
import {PaymentListComponent} from './payment-list/payment-list.component'
import { SaleEmailModalComponent } from './sale-email-modal/sale-email-modal.component';
import { LangService } from '../lang.service';
import * as $ from 'jquery';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';
(window as any).html2canvas = html2canvas;
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.html5';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  $page_title = 'Invoices';
  $settings: any;
  quotations: any;
  tableInstance = null;
  emailModal = {
    customerEmail:"",
    cc:"",
    bcc:"",
    subject:"",
    

  }

  payModal={
    amount:null,
    note:""
  }

  $cols = 4;
  $inv:any;
  @ViewChild('content') content: ElementRef;


  constructor(
    private langService: LangService,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initTable();
  }

  async initTable() {
    let sysSettings = localStorage.getItem('LimSysSettings');
    if(sysSettings){
      this.$settings = JSON.parse(sysSettings);
  }else {
      let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
      this.$settings = sysSettings1[0];
      localStorage.setItem("LimSysSettings",JSON.stringify(sysSettings1[0]));
  }

    let thisObject = this;
    this.http.get('/api/sales/selectAll').subscribe(data => {
      this.quotations = data;

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
          retrieve: true,
          pageLength: thisObject.$settings.rowsPerPage,
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
            { render: status },
            null, //"render": cf
           
            { searchable: false, orderable: false }
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

        $('#fileData').on('click', '.email_inv', function() {
          // var id = $(this).attr('id');
          // var cid = $(this).attr('data-customer');
          // var bid = $(this).attr('data-company');
          // $.getJSON( "<?=site_url('sales/getCE');?>", { cid: cid, bid: bid, <?=$this->security->get_csrf_token_name();?>: '<?=$this->security->get_csrf_hash()?>' }).done(function( json ) {
          //     $('#customer_email').val(json.ce);
          //     $('#subject').val('<?=lang("invoice_from");?> '+json.com);
          // });
          // $('#emailModalLabel').text('<?=lang("email") . " " . lang("invoice") . " " . lang("no");?> '+id);
          // $('#subject').val('<id?=lang("invoice") . " from " . $Settings->site_name;?>');
          // $('#inv_id').val();
          $('#emailModal').modal();
          return false;
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

  // fld($ldate)
  // {
  //     if ($ldate) {
  //         $date = explode(' ', $ldate);
  //         $jsd = $this->dateFormats['js_sdate'];
  //         $inv_date = $date[0];
  //         $time = $date[1];
  //         if ($jsd == 'dd-mm-yyyy' || $jsd == 'dd/mm/yyyy' || $jsd == 'dd.mm.yyyy') {
  //             $date = substr($inv_date, -4) . "-" . substr($inv_date, 3, 2) . "-" . substr($inv_date, 0, 2) . " " . $time;
  //         } elseif ($jsd == 'mm-dd-yyyy' || $jsd == 'mm/dd/yyyy' || $jsd == 'mm.dd.yyyy') {
  //             $date = substr($inv_date, -4) . "-" . substr($inv_date, 0, 2) . "-" . substr($inv_date, 3, 2) . " " . $time;
  //         } else {
  //             $date = $inv_date;
  //         }
  //         return $date;
  //     } else {
  //         return '0000-00-00 00:00:00';
  //     }
  // }

  lang(word) {
    return this.langService.lang(word);
  }

  // deleteConfirm(quoteId){
  //     let confirm = confirm('You are going to remove this quotation. Press OK to proceed and Cancel to Go Back')
  //     if(confirm){

  //     }

  // }

  floatFormat(floatValue){
    if(floatValue && floatValue != 0){
      return parseFloat(floatValue.toFixed(2));
    }else {
      return 0;
    }
  }

  deleteSales(salesId) {
    this.http.get('/api/sales/delete/' + salesId).subscribe(
      data => {
        this.tableInstance.clear();
        this.initTable();
      },
      error => alert(error.error.message)
    );
  }

  openViewModal(saleId){
    const modalRef = this.modalService.open(SaleViewComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.saleId = saleId;
  }

  openEmailModal(emailModal,customerId,saleId,companyName){
    this.http
        .get('/api/customer/selectById/'+customerId )
        .subscribe(data => {
            const modalRef = this.modalService.open(SaleEmailModalComponent);
            modalRef.componentInstance.emailModalObj = {
                saleId,
                companyName,
                customerEmail:data["email"],

            }
        },
        error => alert(error.error.message)
        );
}

  openNewPaymentModal(saleId,customerId){
    const modalRef = this.modalService.open(PaymentDetailComponent);
      modalRef.componentInstance.saleId = saleId;
      modalRef.componentInstance.customerId = customerId;
  }

  openPaymentListModal(saleId,customerId,companyId){
    const modalRef = this.modalService.open(PaymentListComponent);
      modalRef.componentInstance.saleId = saleId;
      modalRef.componentInstance.customerId = customerId;
      modalRef.componentInstance.companyId = companyId;
  }

  getDiscountCols(){
    let col = this.$cols - 2;
    if(this.$settings.productDiscount) { col += 1; }
    if(this.$settings.defaultTaxRate) { col += 1; }

    return col;
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
