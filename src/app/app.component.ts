import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { LangService } from './lang.service';
import { UserSessionService } from './user-session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{
  title = 'LimInvoiceManager';

  // key that is used to access the data in local storage
  STORAGE_KEY = 'login_user';

  total = 1; //$tatal
  $paid = 1;
  $cookieCompany = "shanCompany";
  $cookieName = "feng";
  $cookieEmail = "feng@163.com";
  $cookiePhone = "99998888";

  constructor(private langService:LangService,
    private router: Router,
    private userSessionService:UserSessionService) { }

  lang(word){
    return this.langService.lang(word);
  }

  ngOnInit() {
    let isLogin = this.userSessionService.getUserInfo();
    if(!isLogin){
      this.router.navigate(['login']);
    }else {
      if(window.location.pathname.indexOf("login") > -1){
        window.location.href = "/home";
      }
    }
  }
}
