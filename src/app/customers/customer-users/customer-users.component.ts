import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';

@Component({
  selector: 'app-customer-users',
  templateUrl: './customer-users.component.html',
  styleUrls: ['./customer-users.component.css']
})
export class CustomerUsersComponent implements OnInit {

  $page_title = "Users";

  $Settings:any;
  users:any;
  tableInstance = null;

  customer = {
    id:"",
    name:""
  }

  constructor(private langService:LangService,
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.customer.id = this.route.snapshot.paramMap.get('customerId');
    this.customer.name = this.route.snapshot.paramMap.get('customerName');

    this.initTable();

  }

  async initTable(){
    let sysSettings = localStorage.getItem("LimSysSettings");
    if(sysSettings){
        this.$Settings = JSON.parse(sysSettings);
    }else {
        let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
        this.$Settings = sysSettings1[0];
        localStorage.setItem("LimSysSettings",JSON.stringify(sysSettings1[0]));
    }

    this.http.get('/api/user/selectAllByCustomerId/'+this.customer.id).subscribe(data => {
        this.users = data;

        let thisObject = this;

        $(document).ready(function () {

            var table = $('#fileData').DataTable({

                "dom": '<"text-center"<"btn-group"B>><"clear"><"row"<"col-md-6"l><"col-md-6 pr0"p>r>t<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
                "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                "order": [[1, "asc"]],
                "bInfo" : false,
                retrieve: true,
                "pageLength": thisObject.$Settings.rowsPerPage,
                "columns": [
                    null,
                    null,
                    null,
                    {"searchable": false, "orderable": false },
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
        .get('/api/user/delete/'+id )
        .subscribe(data => {
            this.tableInstance.clear();
            this.initTable();
        },
        error => alert(error.error.message)
        );
  }

}
