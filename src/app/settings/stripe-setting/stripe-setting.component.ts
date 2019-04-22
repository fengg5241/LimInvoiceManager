import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-stripe-setting',
  templateUrl: './stripe-setting.component.html',
  styleUrls: ['./stripe-setting.component.css']
})
export class StripeSettingComponent implements OnInit {

  $page_title = "Skrill Settings"

  curSetting = {
    active:0,
    accountEmail:"",
    secretWord:"",
    fixedCharges:"",
    extraChargesMy:"",
    extraChargesOther:"",
  }
  constructor(private langService: LangService) { }

  ngOnInit() {
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
}
