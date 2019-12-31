import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../lang.service';
import { UtilService } from '../common/util.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.html5';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    $page_title = "Products";
    $settings: any;
    $products: any;

    constructor(private langService: LangService,
        private utilService: UtilService,
        private http: HttpClient) {
    }

    ngOnInit() {
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

        this.http.get('/api/product/selectAll').subscribe(data => {
            this.$products = data;

            let thisObject = this;
            $(document).ready(function () {

                var table = $('#fileData').DataTable({

                    "dom": '<"text-center"<"btn-group"B>><"clear"><"row"<"col-md-6"l><"col-md-6 pr0"p>r>t<"row"<"col-md-6"i><"col-md-6"p>><"clear">',
                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                    "order": [[1, "asc"]],
                    "pageLength": thisObject.$settings.rowsPerPage,
                    retrieve: true,
                    "bInfo" : false,
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
                        {"searchable": false, "orderable": false }
                    ]
                });

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

    displayTaxMethod(taxMethod){
        if (taxMethod == 'inclusive') {
            // return '<small><span class="label label-info">'+{{thisObject.lang('inclusive')}}+'</span></small>'
            return '<small><span class="label label-info">inclusive</span></small>'
        }
        return '<small><span class="label label-primary">exclusive</span></small>'
    }

    delete(id){
        this.http.get('/api/product/delete/'+id).subscribe(data => {
            this.http.get('/api/product/selectAll').subscribe(data => {
                this.$products = data;
            });
        });
        
    }

    lang(word) {
        return this.langService.lang(word);
    }


}
