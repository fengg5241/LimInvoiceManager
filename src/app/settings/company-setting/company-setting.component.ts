import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-company-setting',
  templateUrl: './company-setting.component.html',
  styleUrls: ['./company-setting.component.css']
})
export class CompanySettingComponent implements OnInit {

  $page_title = "Companies";
  $companies :any;
  constructor(private langService: LangService,
    private http: HttpClient) { }

  ngOnInit() {

    this.http.get('/api/company/selectAll').subscribe(data => {
      this.$companies = data;
    });

    $(document).ready(function() {
      $('#fileData').dataTable( {
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "aaSorting": [[ 1, "desc" ]],
        "iDisplayLength": 10,
        retrieve: true,
        "oTableTools": {
          // "sSwfPath": "<?= $assets; ?>media/swf/copy_csv_xls_pdf.swf",
          "aButtons": [ "csv", "xls", { "sExtends": "pdf", "sPdfOrientation": "landscape", "sPdfMessage": "" }, "print" ]
        },
        "aoColumns": [ { "bSortable": false }, null, null, null, null, null, null, null, { "bSortable": false } ]
      });
    });
  }

  lang(word) {
    return this.langService.lang(word);
  }

}