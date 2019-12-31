import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
import { HttpClient } from '@angular/common/http';
import { UserSessionService } from '../user-session.service';
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
//   $Settings = {
//     rows_per_page:10
//   }
  $Settings:any;
  $sim = {
    in_group:{
        admin:true
    }
  }
  customers:any;
  isAdmin:any;
  tableInstance = null;

  constructor(private langService: LangService,
    private http: HttpClient,
    private userSessionService: UserSessionService) { }

  ngOnInit() {
    this.initTable();
  }

  async initTable(){
    let sysSettings = localStorage.getItem("LimSysSettings");
    if(sysSettings){
        this.$Settings = sysSettings;
    }else {
        let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
        this.$Settings = sysSettings1[0];
    }

    this.isAdmin = this.userSessionService.getUserRole() === "admin";

    this.http.get('/api/customer/selectAll').subscribe(data => {
        this.customers = data;

        let thisObject = this;

        $(document).ready(function () {

            let loginColumn = { 
                // "data": "login", 
                "searchable": false, 
                "orderable": false }
           

            var table = $('#fileData').DataTable({

                "dom": '<"text-center"<"btn-group"B>><"clear"><"row"<"col-md-6"l><"col-md-6 pr0"p>r>t<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
                "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                "order": [[1, "asc"]],
                "bInfo" : false,
                retrieve: true,
                "pageLength": thisObject.$Settings.rowsPerPage,
                buttons: [
                    { extend: 'copyHtml5', exportOptions: { columns: [0, 1, 2, 3] } },
                    { extend: 'excelHtml5', 'footer': true, exportOptions: { columns: [0, 1, 2, 3] } },
                    { extend: 'csvHtml5', 'footer': true, exportOptions: { columns: [0, 1, 2, 3] } },
                    {
                        extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'A4', 'footer': true,
                        exportOptions: { columns: [0, 1, 2, 3] }
                    },
                    //   { extend: 'colvis', text: 'Columns'},
                ],
                "columns": [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    {"searchable": false, "orderable": false },
                    loginColumn
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

  lang(word){
    return this.langService.lang(word);
  }

  delete(id){
    this.http
        .get('/api/customer/delete/'+id )
        .subscribe(data => {
            this.tableInstance.clear();
            this.initTable();
        },
        error => alert(error.error.message)
        );
  }

}
