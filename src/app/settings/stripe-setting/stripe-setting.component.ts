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
    secretKey:"",
    publishableKey:"",
    fixedCharges:"",
    extraChargesMy:"",
    extraChargesOther:"",
  }
  constructor(private langService: LangService) { }

  ngOnInit() {
    let thisObject = this;
    $(document).ready(function(){
      $('#active').change(function(){
          var v = $(this).val();
          if(v == 1) {
              $('#secret_key').attr('required', 'required');
              $('#publishable_key').attr('required', 'required');
          } else {
              $('#secret_key').removeAttr('required');
              $('#publishable_key').removeAttr('required');
          }
      });
      var v = thisObject.curSetting.active;
      if(v == 1) {
          $('#secret_key').attr('required', 'required');
          $('#publishable_key').attr('required', 'required');
      } else {
          $('#secret_key').removeAttr('required');
          $('#publishable_key').removeAttr('required');
      }
  });
  }

  lang(word) {
    return this.langService.lang(word);
  }
}
