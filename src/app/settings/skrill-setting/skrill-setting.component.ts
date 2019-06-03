import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-skrill-setting',
  templateUrl: './skrill-setting.component.html',
  styleUrls: ['./skrill-setting.component.css']
})
export class SkrillSettingComponent implements OnInit {
  $page_title = 'Skrill Settings';
  settings: any;
  curSetting = {
    active: 0,
    accountEmail: '',
    secretWord: '',
    fixedCharges: '',
    extraChargesMy: '',
    extraChargesOther: ''
  };
  constructor(private langService: LangService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api/skrill/selectAll').subscribe(data => {
      this.settings = data;
      if (this.settings.length > 0) {
        this.curSetting = Object.assign({}, this.settings[0]);
      }
    });

    let thisObject = this;
    $(document).ready(function() {
      $('#active').change(function() {
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

  updateSysSetting() {
    this.http.post('/api/skrill/update', this.curSetting).subscribe(data => {
      alert('Successful !');
    });
  }
}
