import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import { UserSessionService } from '../../user-session.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: any;

  constructor( private langService: LangService,
    private http: HttpClient,
    private router: Router,
    private userSessionService: UserSessionService) { }

  ngOnInit() {
  }

  lang(word) {
    return this.langService.lang(word);
  }
  submit(){

    let encodedEmail = window.btoa(this.email);
    let host = "http://localhost:4200";
    let emailHost = "http://localhost:8081";
    let mailObject = {
      to:this.email,
      from:"feng5241@gmail.com",
      subject:"Forgotten Password Verification",
      content:`
      <div>
      <h4>Forgot Password?</h4>
      <p>Hello ,</p>
      <p>We have received the request to reset your password of <a href="mailto:${this.email}" target="_blank">${this.email}</a> for Invoice Manager and have created the reset password link.</p>
      <p><a href="${host}/reset_password/${encodedEmail}" target="_blank">Reset Password</a></p>
      <p>Please click the above link to reset your  password. If you have not requested the reset. Please ignore this email.</p>
      <p>Best regards,<br>Invoice Manager</p><br>You can paste this code below in your url if the above link not working<br><a href="${host}/reset_password/${encodedEmail}" target="_blank">${host}/reset_password/${encodedEmail}</a>
      </div>`
    }
    this.http.post(emailHost + '/api/email/sendHtml',mailObject).subscribe(data => {
      if(data){
        this.router.navigate(['login']);
      }else {
        // this.$error = "Fail";
      }
    });
  }
}
