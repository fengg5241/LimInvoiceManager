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
    if(!this.email || !this.validateEmail(this.email)){
      alert("Please input valid email !");
    }else {

      //if this is registed email
      this.http.get('/api/user/getUserByEmail/'+this.email).subscribe(data => {
        if(data){
          let userId = data["id"];
          let encodedUserId = window.btoa(userId);
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
            <p><a href="${host}/resetpassword/${encodedUserId}" target="_blank">Reset Password</a></p>
            <p>Please click the above link to reset your  password. If you have not requested the reset. Please ignore this email.</p>
            <p>Best regards,<br>Invoice Manager</p><br>You can paste this code below in your url if the above link not working<br><a href="${host}/resetpassword/${encodedUserId}" target="_blank">${host}/resetpassword/${encodedUserId}</a>
            </div>`
          }
          // this.http.post(emailHost + '/api/email/sendHtml',mailObject).subscribe(data => {
          //   this.router.navigate(['login']);
          // });
        }else {
          alert("This email is not in the syetem.")
        }
      });
      
      
      
    }
    
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
