import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-tax-rate-setting',
  templateUrl: './tax-rate-setting.component.html',
  styleUrls: ['./tax-rate-setting.component.css']
})
export class TaxRateSettingComponent implements OnInit {

  $page_title = "Tax Rates";
  $tax_rates: any;
  
  constructor(private langService: LangService) { }

  ngOnInit() {
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

  lang(word) {
    return this.langService.lang(word);
  }
}
