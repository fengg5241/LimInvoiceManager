import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  $page_title = "Products";
  $Settings = {
    rows_per_page:10
  }
  constructor(private langService:LangService) { }

  ngOnInit() {
    let thisObject = this;
    $(document).ready(function() {

      function tax_method(m) {
          if (m == 'inclusive') {
              // return '<small><span class="label label-info">'+{{thisObject.lang('inclusive')}}+'</span></small>'
              return '<small><span class="label label-info">inclusive</span></small>'
          }
          return '<small><span class="label label-primary">exclusive</span></small>'
      }
  
      var table = $('#fileData').DataTable( {
  
          "dom": '<"text-center"<"btn-group"B>><"clear"><"row"<"col-md-6"l><"col-md-6 pr0"p>r>t<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
          "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
          "order": [[ 1, "asc" ]],
          // "pageLength": {{thisObject.$Settings.rows_per_page}},
          "pageLength": 10,
          "processing": true, "serverSide": true,
          'ajax' : { url: '/1/products/getdatatableajax', type: 'POST', "data": function ( d ) {
              
          }},
          "buttons": [
          { extend: 'copyHtml5', exportOptions: { columns: [ 0, 1, 2, 3 ] } },
          { extend: 'excelHtml5', 'footer': true, exportOptions: { columns: [ 0, 1, 2, 3 ] } },
          { extend: 'csvHtml5', 'footer': true, exportOptions: { columns: [ 0, 1, 2, 3 ] } },
          { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'A4', 'footer': true,
          exportOptions: { columns: [ 0, 1, 2, 3 ] } },
          { extend: 'colvis', text: 'Columns'},
          ],
          "columns": [
          { "data": "pid", "searchable": false, "visible": false },
          { "data": "product_name" },
          { "data": "details" },
          { "data": "price" },
          { "data": "tax_rate" },
          { "data": "tax_method", "render": tax_method },
          { "data": "Actions", "searchable": false, "orderable": false }
          ]
  
      });
  
      $('#fileData tfoot th:not(:last-child)').each(function () {
          var title = $(this).text();
          $(this).html( '<input type="text" class="text_filter" placeholder="'+title+'" />' );
      });
  
      $('#search_table').on( 'keyup change', function (e) {
          var code = (e.keyCode ? e.keyCode : e.which);
          if (((code == 13 && table.search() !== this.value) || (table.search() !== '' && this.value === ''))) {
              table.search( this.value ).draw();
          }
      });
  
      table.columns().every(function () {
          var self = this;
          $( 'input', this.footer() ).on( 'keyup change', function (e) {
              var code = (e.keyCode ? e.keyCode : e.which);
              if (((code == 13 && self.search() !== this.value) || (self.search() !== '' && this.value === ''))) {
                  self.search( this.value ).draw();
              }
          });
      });
  
  });
  }

  lang(word){
    return this.langService.lang(word);
  }


}
