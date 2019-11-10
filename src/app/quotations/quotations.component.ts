import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as accounting from 'accounting/accounting.js';
import { LangService } from '../lang.service';
import {QuotationView} from './quotation-view/quotation-view.component'
import * as $ from 'jquery';
import * as jspdf from 'jspdf'; 
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.html5';
import 'bootstrap'

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.css']
})
export class QuotationsComponent implements OnInit {

  $page_title = "Quotations";
  $settings: any;
  quotations: any;
  tableInstance = null;

  @ViewChild('content') content: ElementRef;

  $biller:any;
  $customer:any;
  $inv:any;
  quoteItems: any;
  $cols = 4;

  constructor(private langService: LangService,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    //   let mail = {
    //     to:"fengg_5241@163.com",
    //     from:"fengg5241@gmail.com",
    //     subject:"test",
    //     content:"This is actual message"
    //   }
      
    // this.http.post('/api/email/send',mail).subscribe(data => {

    // })
    this.initTable()
  }

  async initTable(){
    let sysSettings = localStorage.getItem("LimSysSettings");
    if(sysSettings){
        this.$settings = JSON.parse(sysSettings);
    }else {
        let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
        this.$settings = sysSettings1[0];
        localStorage.setItem("LimSysSettings",JSON.stringify(sysSettings1[0]));
    }

    let thisObject = this;
    this.http.get('/api/quotation/selectAll').subscribe(data => {
        this.quotations = data;
       
        function status(x) {
          switch (x) {
            case 'sent':
            return '<div class="text-center"><small><span class="label label-success">'+thisObject.lang('sent')+'</span></small></div>';
            break;
            case 'ordered':
            return '<div class="text-center"><small><span class="label label-success">'+thisObject.lang('ordered')+'</span></small></div>';
            break;
            case 'pending':
            return '<div class="text-center"><small><span class="label label-default">'+thisObject.lang('pending')+'</span></small></div>';
            break;
            default:
            return '<div class="text-center"><small><span class="label'+x+' label label-default">'+x+'</span></small></div>';
          }
        }

        let thisObject = this;
        $(document).ready(function () {

            var table = $('#fileData').DataTable({

                "dom": '<"text-center"<"btn-group"B>><"clear"><"row"<"col-md-6"l><"col-md-6 pr0"p>r>t<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
                "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                "order": [[1, "asc"]],
                "pageLength": thisObject.$settings.rowsPerPage,
                retrieve: true,
                buttons: [
                  { extend: 'copyHtml5', exportOptions: { columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] } },
                  { extend: 'excelHtml5', 'footer': true, exportOptions: { columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] } },
                  { extend: 'csvHtml5', 'footer': true, exportOptions: { columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] } },
                  { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'A4', 'footer': true, 
                  exportOptions: { columns: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] } },
                    //   { extend: 'colvis', text: 'Columns'},
                ],
                "columns": [
                    null,
                    null,//"render": fld
                    null,
                    null,
                    null,
                    null,
                    null,//"render": cf
                    null,//"render": cf
                    null,//"render": cf
                    null,//"render": cf,
                    null,//"render": cf 
                    null,//"render": fsd
                    {"render": status},
                    {"searchable": false, "orderable": false }
                ]
            });

            thisObject.tableInstance = table;

            $('#fileData tfoot th:not(:last-child)').each(function () {
                var title = $(this).text();
                $(this).html('<input type="text" class="text_filter" placeholder="' + title + '" />');
            });

            $('#search_table').on('keyup change', function (e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (((code == 13 && table.search() !== this.value) || (table.search() !== '' && this.value === ''))) {
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

            table.columns().every(function () {
                var self = this;
                $('input', this.footer()).on('keyup change', function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (((code == 13 && self.search() !== this.value) || (self.search() !== '' && this.value === ''))) {
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

deleteQuote(quoteId){
    this.http
        .get('/api/quotation/delete/'+quoteId )
        .subscribe(data => {
            this.tableInstance.clear();
            this.initTable();
        },
        error => alert(error.error.message)
        );
}

openViewModal(quoteId){
    const modalRef = this.modalService.open(QuotationView);
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.quoteId = quoteId;
}

downloadPDF(quoteId){
    

    this.initPDF(quoteId);

  
}

async initPDF(quoteId){
    this.$inv = await this.http.get('/api/quotation/selectById/' + quoteId).toPromise();
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
        .get('/api/quotationItem/selectByQuoteId/' + quoteId)
        .toPromise();

        let doc = new jspdf();

    let specialElementHandlers = {
        '#editor':function(){
            return true;
        }
    }
        let content = this.content.nativeElement;
        doc.fromHTML(content.innerHTML,10,10,{
            'width':900,
            'elementHandlers':specialElementHandlers
        });
        doc.save("test.pdf");
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

  getDiscountCols(){
    let col = this.$cols - 2;
    if(this.$settings.productDiscount) { col += 1; }
    if(this.$settings.defaultTaxRate) { col += 1; }

    return col;
  }

  getStatusPng(){
    return "assets/img/"+this.$inv.status+".png";
  }
}
