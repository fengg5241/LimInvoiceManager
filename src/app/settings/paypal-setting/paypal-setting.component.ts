import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paypal-setting',
  templateUrl: './paypal-setting.component.html',
  styleUrls: ['./paypal-setting.component.css']
})
export class PaypalSettingComponent implements OnInit {

  $page_title = "Paypal Settings"
  settings:any;
  curSetting = {
    active:0,
    accountEmail:"",
    fixedCharges:"",
    extraChargesMy:"",
    extraChargesOther:"",
  }
  constructor(private langService: LangService,
    private http: HttpClient) { }

  ngOnInit() {

    this.http.get('/api/paypal/selectAll').subscribe(data => {
      this.settings = data;
      if(this.settings.length > 0){
        this.curSetting = Object.assign({}, this.settings[0]);
      }
    });

    let thisObject = this;
    $(document).ready(function () {
      $('#active').change(function () {
        var v = $(this).val();
        if (v == 1) {
          $('#account_email').attr('required', 'required');
        } else {
          $('#account_email').removeAttr('required');
        }
      });
      var v = thisObject.curSetting.active;
      if (v == 1) {
        $('#account_email').attr('required', 'required');
      } else {
        $('#account_email').removeAttr('required');
      }
    });
  }

  lang(word) {
    return this.langService.lang(word);
  }

  updateSysSetting(){
    this.http.post('/api/paypal/update',this.curSetting).subscribe(data => {
      alert("Successful !");
    });
  }
}
