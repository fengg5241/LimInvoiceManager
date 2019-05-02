import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent implements OnInit {

  $page_title = "System Settings";
  settings:any;
  $tax_rates:any;
  $date_formats:any;

  curSetting = {
    siteName:"",
    theme:"",
    language:"",
    displayWords:"",
    currencyPrefix:"",
    defaultTaxRate:"",
    defaultEmail:"",
    emailHtml:"",
    dateformat:"",
    printPayment:"",
    calendar:"",
    restrictSales:"",
    rowsPerPage:"",
    noOfRows:"",
    customerUser:"",
    productDiscount:"",
    decimals:"",
    decimalsSep:"",
    thousandsSep:"",
    protocol:"",
    mailpath:"",
    smtpHost:"",
    smtpUser:"",
    smtpPass:"",
    smtpPort:"",
    smtpCrypto:"",
  }

  constructor(private langService: LangService,
    private http: HttpClient) { }

  ngOnInit() {

    this.http.get('/api/taxRate/selectAll').subscribe(data => {
      this.$tax_rates = data;
    });

    this.http.get('/api/dateFormat/selectAll').subscribe(data => {
      this.$date_formats = data;
    });
    
    this.http.get('/api/sysSetting/selectAll').subscribe(data => {
      this.settings = data;
      if(this.settings.length > 0){
        this.curSetting = Object.assign({}, this.settings[0]);
      }

    });

    let thisObject = this;
    $(document).ready(function () {
      if ($('#protocol').val() == 'smtp') {
        $('#smtp_config').slideDown();
      } else if ($('#protocol').val() == 'sendmail') {
        $('#sendmail_config').slideDown();
      }
      $('#protocol').change(function () {
        if ($(this).val() == 'smtp') {
          $('#sendmail_config').slideUp();
          $('#smtp_config').slideDown();
        } else if ($(this).val() == 'sendmail') {
          $('#smtp_config').slideUp();
          $('#sendmail_config').slideDown();
        } else {
          $('#smtp_config').slideUp();
          $('#sendmail_config').slideUp();
        }
      });

    });
  }

  lang(word) {
    return this.langService.lang(word);
  }

  updateSysSetting(){
    this.http.post('/api/sysSetting/update',this.curSetting).subscribe(data => {
      alert("Successful !");
    });
  }

}
