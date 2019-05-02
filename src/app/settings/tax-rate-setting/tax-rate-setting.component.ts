import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-tax-rate-setting',
  templateUrl: './tax-rate-setting.component.html',
  styleUrls: ['./tax-rate-setting.component.css']
})
export class TaxRateSettingComponent implements OnInit {

  $page_title = "Tax Rates";
  $tax_rates: any;
  
  constructor(private langService: LangService,
    private http: HttpClient,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.http.get('/api/taxRate/selectAll').subscribe(data => {
      this.$tax_rates = data;
    });

    $(document).ready(function () {
      $('#fileData').dataTable({
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "aaSorting": [[1, "desc"]],
        "iDisplayLength": 10,
        "oTableTools": {
          // "sSwfPath": "<?= $assets; ?>media/swf/copy_csv_xls_pdf.swf",
          "aButtons": ["csv", "xls", { "sExtends": "pdf", "sPdfOrientation": "landscape", "sPdfMessage": "" }, "print"]
        },
        "aoColumns": [{ "bSortable": false }, null, null, null, { "bSortable": false }]
      });
    });
  }

  delete(id){
    this.http.get('/api/taxRate/delete/'+id).subscribe(data => {
      window.location.reload()
    });
  }

  lang(word) {
    return this.langService.lang(word);
  }
}
