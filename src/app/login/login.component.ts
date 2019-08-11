import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { LangService } from '../lang.service';
import { UserSessionService } from '../user-session.service';
import { EmailSettingComponent } from '../settings/email-setting/email-setting.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {

  $settings: any;
  $error: any;
  email: any;
  password: any;

  constructor(
    private langService: LangService,
    private http: HttpClient,
    private router: Router,
    private userSessionService: UserSessionService
  ) {}

  ngOnInit() {}

  lang(word) {
    return this.langService.lang(word);
  }

  login() {
    let loginUser = {
      email:this.email,
      password:this.password
    }
    this.http.post('/api/user/loginAuth',loginUser).subscribe(data => {
      if(data){
        this.userSessionService.setUserInfo(data);
        this.router.navigate(['home']);
      }else {
        this.$error = "Incorrect Login";
      }
    });
  }
}
