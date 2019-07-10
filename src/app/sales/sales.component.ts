import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '../lang.service';
import * as $ from 'jquery';
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

  constructor(
    private langService: LangService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.initTable();
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

    let thisObject = this;
    this.http.get('/api/quotation/selectAll').subscribe(data => {
      this.quotations = data;

      function status(x) {
        switch (x) {
          case 'sent':
            return (
              '<div class="text-center"><small><span class="label label-success">' +
              thisObject.lang('sent') +
              '</span></small></div>'
            );
            break;
          case 'ordered':
            return (
              '<div class="text-center"><small><span class="label label-success">' +
              thisObject.lang('ordered') +
              '</span></small></div>'
            );
            break;
          case 'pending':
            return (
              '<div class="text-center"><small><span class="label label-default">' +
              thisObject.lang('pending') +
              '</span></small></div>'
            );
            break;
          default:
            return (
              '<div class="text-center"><small><span class="label' +
              x +
              ' label label-default">' +
              x +
              '</span></small></div>'
            );
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
            null, //"render": cf
            { render: status },
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

  deleteQuote(quoteId) {
    this.http.get('/api/quotation/delete/' + quoteId).subscribe(
      data => {
        this.tableInstance.clear();
        this.initTable();
      },
      error => alert(error.error.message)
    );
  }
}
