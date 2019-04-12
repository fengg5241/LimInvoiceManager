import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  $page_title = "Customers";
  $Settings = {
    rows_per_page:10
  }
  $sim = {
    in_group:{
        admin:true
    }
  }
  constructor(private langService:LangService) { }

  admin = true;
  ngOnInit() {
    let thisObject = this;
    let rows_per_page = thisObject.$Settings.rows_per_page;
    $(document).ready(function() {
        
        let isAdmin = true;
        let loginColumn = { 
            "data": "login", 
            "searchable": false, 
            "orderable": false }
        if(!isAdmin){
            loginColumn["visible"] = false;
        }
      
  
      var table = $('#fileData').DataTable( {
  
        "dom": '<"text-center"<"btn-group"B>><"clear"><"row"<"col-md-6"l><"col-md-6 pr0"p>r>t<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "order": [[ 2, "asc" ], [ 1, "asc" ]],
          "pageLength": rows_per_page,
        //   "pageLength": 10,
          "processing": true, 
          'ajax' : { url: './data/getCustomers.txt', type: 'GET', "dataSrc": ""},
          "buttons": [
          { extend: 'copyHtml5', exportOptions: { columns: [ 0, 1, 2, 3 ] } },
          { extend: 'excelHtml5', 'footer': true, exportOptions: { columns: [ 0, 1, 2, 3 ] } },
          { extend: 'csvHtml5', 'footer': true, exportOptions: { columns: [ 0, 1, 2, 3 ] } },
          { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'A4', 'footer': true,
          exportOptions: { columns: [ 0, 1, 2, 3 ] } },
        //   { extend: 'colvis', text: 'Columns'},
          ],
          "columns": [
            { "data": "id", "searchable": false, "visible": false },
            { "data": "name" },
            { "data": "company" },
            { "data": "phone" },
            { "data": "email" },
            { "data": "city" },
            { "data": "country" },
            { "data": "Actions", "searchable": false, "orderable": false },
            loginColumn
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
