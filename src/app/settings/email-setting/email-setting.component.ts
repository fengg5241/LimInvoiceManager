import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.css']
})
export class EmailSettingComponent implements OnInit {
  $page_title = 'Email Templates';
  settings: any;
  curSetting = {
    active: 0,
    accountEmail: '',
    fixedCharges: '',
    extraChargesMy: '',
    extraChargesOther: ''
  };
  $credentials = this.getCredentials();

  constructor(private langService: LangService, private http: HttpClient) {}

  ngOnInit() {
    // this.http.get('/api/email/selectAll').subscribe(data => {
    //   this.settings = data;
    //   if (this.settings.length > 0) {
    //     this.curSetting = Object.assign({}, this.settings[0]);
    //   }
    // });

    let thisObject = this;
    $(document).ready(function() {
      $('#credentials-ta').bind('input propertychange', function(event) {
        $('#credentials-pr').html($(this).val());
      });
      $('#activate_email-ta').bind('input propertychange', function(event) {
        $('#activate_email-pr').html($(this).val());
      });
      $('#forgot_password-ta').bind('input propertychange', function(event) {
        $('#forgot_password-pr').html($(this).val());
      });
      $('#new_password-ta').bind('input propertychange', function(event) {
        $('#new_password-pr').html($(this).val());
      });
    });
  }

  getCredentials() {
    return `<h3>{logo}</h3>
            <h4>Login Details</h4>
            <p>Hello {user_name},</p>
            <p>We have created new account for you to manage your quotations and orders from our website.</p>
            <p>Your credentials are:</p>
            <pre>Site Link: {site_link}
            Username: {email}
            Password: {password}
            </pre>
            <p><a href="{client_link}"></a></p>
            <p>Best regards,<br>{site_name}</p>`;
  }

  getActivateEmail() {
    return `<h3>{logo}</h3>
            <h4>Please confirm your registration</h4>
            <p>Hello {user_name},</p>
            <p>Please confirm your new account registration for ({email}). </p>
            <p>{activation_link}</p>
            <p><a href="{client_link}"></a></p>
            <p>Best regards,<br>{site_name}<br>{site_link}</p>`;
  }

  getForgotPassword() {
    return `<h3>{logo}</h3>
            <h4>Forgot Password?</h4>
            <p>Hello {user_name},</p>
            <p>We have received the request to reset your password of {email} for {site_name} and have created the reset password link.</p>
            <p>{reset_password_link}</p>
            <p>Please click the above link to reset your  password. If you have not requested the reset. Please ignore this email.</p>
            <p>Best regards,<br>{site_name}</p>`;
  }

  getNewPassword() {
    return `<h3>{logo}</h3>
            <h4>Login Details</h4>
            <p>Hello {user_name},</p>
            <p>You have reset your account password. </p>
            <p>Your credentials are:</p>
            <pre>Site Link: {site_link}
            Username: {email}
            Password: {password}
            </pre>
            <p><a href="{client_link}"></a></p>
            <p>Best regards,<br>{site_name}</p>`;
  }

  lang(word) {
    return this.langService.lang(word);
  }
}
