import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css']
})
export class SystemSettingComponent implements OnInit {

  $page_title = "System Settings";


  constructor(private langService: LangService) { }

  ngOnInit() {
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


}
