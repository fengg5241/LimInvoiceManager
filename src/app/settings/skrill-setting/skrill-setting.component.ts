import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-skrill-setting',
  templateUrl: './skrill-setting.component.html',
  styleUrls: ['./skrill-setting.component.css']
})
export class SkrillSettingComponent implements OnInit {

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
